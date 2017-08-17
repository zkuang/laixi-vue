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

function convertNewlineToBr(data) {
  return data.replace(/(?:\r\n|\r|\n)/g, '<br />')
}

function convertBrToNewline(data) {
  return data.replace(/<br \/>/g, '\n')
}

function convertBqAndBr(data) {
  return data.replace(/<(br *\/)>/g, '%c%c%c$1%c%c%c')
    .replace(/<(blockquote *)>/g, '%c%c%c$1%c%c%c')
    .replace(/<(\/blockquote *)>/g, '%c%c%c$1%c%c%c')
}

function revertBqAndBr(data) {
  return data.replace(/%c%c%c(.*?)%c%c%c/g, '<$1>')
}

// function convertMDBq(data) {
//   return data.replace(/(^>( .*)$)/gm, '%c%c%cmdquote$1')
// }
//
// function revertMDBq(data) {
//   return data.replace(/(^%c%c%cmdquote( .*)$)/gm, '>$1')
// }

export const Html = {
  escapeHTML(html) {
    escapeEl.textContent = html
    return escapeEl.innerHTML
  },
  unescapeHTML(data) {
    let doc = new DOMParser().parseFromString(data, 'text/html')
    return doc.documentElement.textContent
  },
  rawEscapeHTML(html) {
    let data = convertNewlineToBr(convertBqAndBr(html))
    return Html.escapeHTML(data)
  },
  rawUnescapeHTML(data) {
    let doc = new DOMParser().parseFromString(data, 'text/html')
    return convertNewlineToBr(Html.escapeHTML(revertBqAndBr(convertBrToNewline(doc.documentElement.textContent))))
  },
  rawEditUnescapeHTML(text) {
    var txt = document.createElement('textarea')
    txt.innerHTML = text
    return revertBqAndBr(txt.value.replace(/<br *\/>/g, '\n'))
  },
  mdEscapeHTML(html) {
    return revertBqAndBr(convertNewlineToBr(Html.escapeHTML(convertBqAndBr(html))))
  },
  mdUnescapeHTML(html) {
    return revertBqAndBr(Html.escapeHTML(convertBqAndBr(html)))
  }
}
