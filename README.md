# calendar-reservation

## 專案簡介
此專案為OH!Bot! 思言科技 - 前端工程師面試考題

## 過程心得
第一次寫日歷、行事曆與這些相關功能。第一眼看到題目的時候，超怕自己做不出來，因為表格甚麼的以前光看到就不太敢碰，就一直沒去碰...但該來的還是會來(汗顏，而且還有時間限制。不過開始寫之後，就自然不會管這些了，做就對了，當作自己想做的專案在開發!  

但認真來說，架構真的寫得很糟(包括HTML、CSS)，一開始太怕做不完就埋頭一直寫，沒有先規劃好。真的很想整個重寫，但時間上絕對是來不及的...，所以造成了很多 `dirty code` 和類似 `monkey patch` 不斷的補來補去滾雪球，且還有大量的DOM操作...

雖然有些功能最後還是沒做出來或是有Bug，但大多數的還是能做出來的，真的增加了不少經驗值，最重要的是，也可知道自己的不足之處在哪。

## 目前無法解決或來不急解決的問題，都已整理在 [issues](https://github.com/Proladon/Calendar-reservation/issues)

## 功能展示

### 周檢視/日檢視: 切換星期/日期
[dayView 滑動切換畫面glitch](https://github.com/Proladon/Calendar-reservation/issues/5)
<div style="display: flex; flex-wrap: wrap;">
  <img src="https://github.com/Proladon/Calendar-reservation/blob/main/demo_gif/week_scroll.gif" width="250"/>
  <img src="https://github.com/Proladon/Calendar-reservation/blob/main/demo_gif/day_scroll.gif" width="250"/>
</div>

### 虛擬捲動(無限捲動)日曆: 選擇日期
<img src="https://github.com/Proladon/Calendar-reservation/blob/main/demo_gif/select_date.gif" width="250"/>

### 周檢視/日檢視: 新增預約
預約資訊顯示問題: [預約資訊顯示導致單元格跑版-故暫時放棄顯示訊息](https://github.com/Proladon/Calendar-reservation/issues/9)
<div style="display: flex; flex-wrap: wrap;">
  <img src="https://github.com/Proladon/Calendar-reservation/blob/main/demo_gif/week_reservation.gif" width="250"/>
  <img src="https://github.com/Proladon/Calendar-reservation/blob/main/demo_gif/day_reservation.gif" width="250"/>
</div>
