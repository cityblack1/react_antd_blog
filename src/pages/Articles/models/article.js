import { getArticleData, getPartArticleData, postComment, getComments } from '@/services/api';

let version = 0

export default {
  namespace: 'article',

  state: {
    articles: [],
    dates: [],
    tags: [],
    categories: [],
    version: 0,
    loading: false
  },

  effects: {
    *fetch(_, { call, put }) {
      yield put({
        type: 'save',
        payload: {loading: true},
      });
      const response = yield call(getArticleData);
      response.loading = false
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchPart({payload}, { call, put }) {
      yield put({
        type: 'save',
        payload: {loading: true},
      });
      const response = yield call(getPartArticleData, payload);
      response.loading = false
      yield put({
        type: 'save',
        payload: response,
      });
    },    
    *comment({payload, article}, {call, put}) {
      yield call(postComment, payload)
      const article_id = payload.article_id
      const comments = yield call(getComments, article_id)
      article.comments = comments
      version += 1
      yield put({
        type: 'save',
        payload: {version}
      })
    },
    *fetchSalesData(_, { call, put }) {
      const response = yield call(fakeChartData);
      yield put({
        type: 'save',
        payload: {
          salesData: response.salesData,
        },
      });
    },
  },

  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    clear() {
      return {
        visitData: [],
        visitData2: [],
        salesData: [],
        searchData: [],
        offlineData: [],
        offlineChartData: [],
        salesTypeData: [],
        salesTypeDataOnline: [],
        salesTypeDataOffline: [],
        radarData: [],
      };
    },
  },
};
