import { call, put, takeLatest } from 'redux-saga/effects'
import { getApiDefault, postApiDefault } from './api'
import { transactionActions } from './transactionSlice'

// Lấy danh sách giao dịch
function* onGetList() {
  const url = '/Transaction'
  try {
    const response = yield call(getApiDefault, url)
    if (response && response.status === 200) {
      yield put(transactionActions.getListTransactionSuccess(response.data))
    } else {
      yield put(transactionActions.getListTransactionFailed())
    }
  } catch (error) {
    yield put(transactionActions.getListTransactionFailed('internet'))
  }
}

export default function* transactionSaga() {
  yield takeLatest(transactionActions.getListTransaction, onGetList)
}
