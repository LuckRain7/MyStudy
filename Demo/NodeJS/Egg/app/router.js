'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/session', controller.home.sessionTest);
  router.get('/getSession', controller.home.getSession);
  router.get('/loginOut', controller.home.loginOut);
  router.get('/news', controller.news.index);
  router.get('/newscontent', controller.news.content);
  router.post('/add', controller.home.add);
};

