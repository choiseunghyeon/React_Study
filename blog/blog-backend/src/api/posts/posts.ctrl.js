import Post from '../../models/post.js';
import mongoose from 'mongoose';
import Joi from '@hapi/joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request;
    return;
  }
  return next();
};

/**
 * POST /api/posts
 * {
 *      title: '제목',
 *      body: '내용',
 *      tags: ['태그1','태그2']
 * }
 */
export const write = async (ctx) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).required(),
  });

  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }

  const { title, body, tags } = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
  });
  try {
    await post.save();
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * GET /api/posts
 */
export const list = async (ctx) => {
  //query는 문자열이기 때문에 숫자로 변환해 주어야함.
  // 값이 없다면 1이 기본값
  const page = parseInt(ctx.query.page || '1', 10);
  try {
    // sort 파라미터에서 key는 정렬할 필드 값이 1이면 오름차순, -1 내림차순
    const posts = await Post.find()
      .sort({ _id: -1 })
      .limit(10)
      .skip((page - 1) * 10)
      .lean() // Mongoose 문서 인스턴스 형태가 아닌 JSON형태로 조회 가능 681p.
      .exec();
    ctx.body = posts;
    //client에 페이지 개수 전달
    const postCount = await Post.countDocuments().exec();
    ctx.set('Last-Page', Math.ceil(postCount / 10));
    ctx.body = posts.map((post) => ({
      ...post,
      body:
        post.body.length < 200 ? post.body : `${post.body.slice(0, 200)}...`,
    }));
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * GET /api/posts/:id
 */
export const read = async (ctx) => {
  const { id } = ctx.params;
  try {
    const post = await Post.findById(id).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * DELETE /api/posts/:id
 */
export const remove = async (ctx) => {
  const { id } = ctx.params;
  try {
    await Post.findByIdAndRemove(id).exec();
    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};

/**
 * PATCH /api/posts/:id
 * {
 *      title: '수정',
 *      body: '수정 내용',
 *      tags: ['수정','태그']
 * }
 */
export const update = async (ctx) => {
  const schema = Joi.object({
    title: Joi.string(),
    body: Joi.string(),
    tags: Joi.array().items(Joi.string()),
  });
  const result = schema.validate(ctx.request.body);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error;
    return;
  }
  const { id } = ctx.params;
  try {
    // 세 번째 파라미터에 new: true를 설정하면 업데이트된 데이터를 반환
    const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
      new: true,
    }).exec();
    if (!post) {
      ctx.status = 404;
      return;
    }
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e);
  }
};
