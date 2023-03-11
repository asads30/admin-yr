import Cookies from 'js-cookie'
import { getChannels, getUsers, getPayments, getProducts } from '@/api/remote-search'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  size: Cookies.get('size') || 'medium',
  channelsCount: Cookies.get('channelsCount') ? Cookies.get('channelsCount') : 0,
  usersCount: Cookies.get('usersCount') ? Cookies.get('usersCount') : 0,
  paymentsCount: Cookies.get('paymentsCount') ? Cookies.get('paymentsCount') : 0,
  productsCount: Cookies.get('productsCount') ? Cookies.get('productsCount') : 0
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  SET_SIZE: (state, size) => {
    state.size = size
    Cookies.set('size', size)
  },
  FETCH_PAYMENTS: (state, payments) => {
    state.payments = payments
    Cookies.set('payments', payments)
  },
  FETCH_USERS_COUNT: (state, usersCount) => {
    state.usersCount = usersCount
    Cookies.set('usersCount', usersCount)
  },
  FETCH_CHANNELS_COUNT: (state, channelsCount) => {
    state.channelsCount = channelsCount
    Cookies.set('channelsCount', channelsCount)
  },
  FETCH_PAYMENTS_COUNT: (state, paymentsCount) => {
    state.paymentsCount = paymentsCount
    Cookies.set('paymentsCount', paymentsCount)
  },
  FETCH_PRODUCTS_COUNT: (state, productsCount) => {
    state.productsCount = productsCount
    Cookies.set('productsCount', productsCount)
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },
  setSize({ commit }, size) {
    commit('SET_SIZE', size)
  },
  fetchChannelsCount({ commit }) {
    return new Promise((resolve, reject) => {
      getChannels().then(response => {
        const data = response.totalChannelCount
        commit('FETCH_CHANNELS_COUNT', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchUsersCount({ commit }) {
    return new Promise((resolve, reject) => {
      getUsers().then(response => {
        const data = response
        commit('FETCH_USERS_COUNT', data.totalUserCount)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchPaymentsCount({ commit }) {
    return new Promise((resolve, reject) => {
      getPayments().then(response => {
        const data = response
        commit('FETCH_PAYMENTS_COUNT', data.totalPaymentsCount)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  fetchProductsCount({ commit }) {
    return new Promise((resolve, reject) => {
      getProducts().then(response => {
        const data = response
        commit('FETCH_PRODUCTS_COUNT', data.totalProductCount)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
