import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export const DateTime = {
  DateMonth (string) {
    return moment(string).format('M月D日')
  },
  DateMonthYear (string) {
    return moment(string).format('Y年M月D日')
  },
  DateMonthYearTime (string) {
    return moment(string).format('Y-M-D hh:mm')
  },
  DateFromNow (string) {
    return moment(string).fromNow()
  }
}

export const Page = {
  getPageNumber (length) {
    return Math.floor(length / 250)
  }
}
