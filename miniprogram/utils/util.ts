export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export function throttle(fn: Function, interval: number, options = { leading: true, trailing: false }) {
  const { leading, trailing } = options
  let lastTime = 0
  let timer = null as any
  const _throttle = function (...args: any) {
    const nowTime = new Date().getTime() //现在的时间
    if (lastTime === 0 && leading === false) {
      //如果我们的lastTime === 0  并且我们第一次决定不触发的时候 我们才会将lastTime 赋值nowTime
      lastTime = nowTime
    }
    //用现在的时间减去上一次执行后的时间 与 我们的时间间隔相比较 推出现在是否应该执行
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      // @ts-ignore
      fn.apply(this, ...args)
      lastTime = nowTime
      // 一旦我们这里开始执行之后 我们就没必要再在下面增加定时器了 如果增加会出现执行多次情况
      return
    }
    if (trailing && timer === null) {
      timer = setTimeout(() => {
        timer = null
        // @ts-ignore
        fn.apply(this, ...args)
        // 为了避免我们我们leading为true的时候重复执行  我们这边必须将lastTime置为我们现在正在执行的时间
        lastTime = !leading ? 0 : new Date().getTime()
      }, remainTime)
    }
  }
  return _throttle
}

export function analysisLyric(lyric: string) {
  const newArray = []
  const lyricLines = lyric.split('\n')
  const timeReg = /\[(\d{2}):(\d{2}).(\d{2,3})\]/gi
  let index = 0
  for (const lineString of lyricLines) {
    index++
    const res = timeReg.exec(lineString)
    if (res === null) {
      continue
    }
    const mm = res?.[1] as any * 60 * 1000
    const ss = res?.[2] as any * 1000
    const ms = res?.[3].length === 2 ? res?.[3] as any * 10 : res?.[3] as any * 1
    const time = mm + ss + ms
    const text = lineString.replace(timeReg, '')
    const lyricInfo = {
      text,
      time,
      pid: index
    }
    newArray.push(lyricInfo)
  }
  return newArray
}

export function debounce(fn: Function, timeout = 1000, immediate = true) {
  let timer: any = null
  let onceIn = immediate //采用第三个变量来控制是否立即执行
  const _debounce = function (...args: any) {
    //如果我们下次执行过来的时候 我们的timer有值的情况下的话 关闭上次的
    if (timer || onceIn) {
      if (onceIn === true) {
        onceIn = false
        // @ts-ignore
        fn.apply(this, args)
      }
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      //我们执行的时候 fn() 是直接调用的我们的this是指向window的
      // @ts-ignore
      fn.apply(this, args) // 我们应该在执行的时候改变我们的this
    }, timeout)
  }
  //这个我们返回出去就相当于 我们oninput的时候实际上是在执行这个函数
  return _debounce
}
