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

  rawEditUnescapeHTML(text) {
    var txt = document.createElement('textarea')
    txt.innerHTML = text
    return txt.value.replace(/<br *\/>/g, '\n')
      .replace(/%%%(br *\/)%%%/g, '<$1>')
  },

  whileListEscapeHTML(html) {
    return Html.escapeHTML(
        html.replace(/<br *\/>/g, '%br%')
        .replace('<blockquote>', '%blockquote%')
        .replace('</blockquote>', '%/blockquote%')
      ).replace(/%br%/g, '<br />')
      .replace('%blockquote%', '<blockquote>')
      .replace('%/blockquote%', '</blockquote>')
  },

  rawEscapeHTML(html) {
    let data = html.replace(/<(br *\/)>/g, '%%%$1%%%').replace(/(?:\r\n|\r|\n)/g, '<br />')
    escapeEl.textContent = data
    return escapeEl.innerHTML
  },
  rawUnescapeHTML(data) {
    let doc = new DOMParser().parseFromString(data, 'text/html')
    return Html.whileListEscapeHTML(doc.documentElement.textContent).replace(/%%%(br *\/)%%%/g, '&lt;$1&gt;')
  },
  mdEscapeHTML(html) {

  },
  mdUnescapeHTML(md) {

  }
}
