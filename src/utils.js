import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export const DateTime = {
  DateMonth(string) {
    return moment(string).format('M月D日')
  },
  DateMonthYear(string) {
    return moment(string).format('Y年M月D日')
  },
  DateMonthYearTime(string) {
    return moment(string).format('Y-M-D hh:mm')
  },
  DateFromNow(string) {
    return moment(string).fromNow()
  },
  DateGetCalendarEn(string) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    let datetime = new Date(moment(string))
    let month = months[datetime.getMonth()]
    let date = datetime.getDate()
    let year = datetime.getFullYear()
    return `${month} ${date}, ${year}`
  }
}

export const Page = {
  getPageNumber(length) {
    return Math.floor(length / 250)
  }
}

let escapeEl = document.createElement('textarea')

export const Html = {

  escapeHTML(html) {
    escapeEl.textContent = html
    return escapeEl.innerHTML
  },

  unescapeHTML(text) {
    var doc = new DOMParser().parseFromString(text, 'text/html')
    return doc.documentElement.textContent
  },

  whileListEscapeHTML(html) {
    return Html.escapeHTML(
        html.replace('<br>', '%br%')
        .replace('<blockquote>', '%blockquote%')
        .replace('</blockquote>', '%/blockquote%')
      ).replace('%br%', '<br>')
      .replace('%blockquote%', '<blockquote>')
      .replace('%/blockquote%', '</blockquote>')
  }
}
