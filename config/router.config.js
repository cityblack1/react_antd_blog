export default [
  // user
  // {
  //   path: '/user',
  //   component: '../layouts/UserLayout',
  //   routes: [
  //     { path: '/user', redirect: '/user/login' },
  //     { path: '/user/login', name: 'login', component: './User/Login' },
  //     { path: '/user/register', name: 'register', component: './User/Register' },
  //     {
  //       path: '/user/register-result',
  //       name: 'register.result',
  //       component: './User/RegisterResult',
  //     },
  //     {
  //       component: '404',
  //     },
  //   ],
  // },
  // app
  {
    path: '/',
    component: '../layouts/BlankLayout',
    Routes: ['src/pages/Authorized'],
    routes: [
      // dashboard
      { path: '/', redirect: '/articles/list' },
      {
        path: '/articles',
        name: 'dashboard',
        icon: 'dashboard',
        routes: [
          {
            path: '/articles/list',
            name: 'analysis',
            component: './Articles/List',
          },
          {
            path: '/articles/:part/:id',
            name: 'monitor',
            component: './Articles/List',
          },
        ],
      },
      {
        component: '404',
      },
    ],
  },
];
