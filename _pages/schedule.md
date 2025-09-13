---
layout: page
title: Schedule
permalink: /schedule/
description: 今後3ヶ月の予定
nav: true
nav_order: 6
---

<div id="calendar"></div>

<!-- モーダル (Bootstrap 4) -->
<div class="modal fade" id="eventModal" tabindex="-1" role="dialog" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p class="event-time"></p>
        <p class="event-location"></p>
        <p class="event-description"></p>
      </div>
    </div>
  </div>
</div>

<!-- FullCalendar本体 -->
<script src='https://cdn.jsdelivr.net/npm/fullcalendar@6.1.10/index.global.min.js'></script>

<!-- 注意: このサイトは Bootstrap 4 を使用しています。Bootstrap 5 は読み込まないでください。 -->

<!-- カスタム設定 -->
<script>
document.addEventListener('DOMContentLoaded', function() {
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek'
    },
    views: {
      dayGridMonth: {
        titleFormat: { year: 'numeric', month: 'long' }
      }
    },
    validRange: {
      start: new Date(),
      end: new Date().setMonth(new Date().getMonth() + 3)
    },
    // FullCalendar はデフォルトテーマを使用（Bootstrap 5 は混在させない）
    // themeSystem: 'standard',
    height: 'auto',
    firstDay: 0,
    locale: 'ja',
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    },
    events: {{ site.data.schedule.events | jsonify }},
    eventClick: function(info) {
      var modal = document.getElementById('eventModal');
      modal.querySelector('.modal-title').textContent = info.event.title;
      
      // 時間の表示
      var timeText = info.event.start.toLocaleString('ja-JP', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      if (info.event.end) {
        timeText += ' - ' + info.event.end.toLocaleString('ja-JP', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      }
      modal.querySelector('.event-time').textContent = timeText;
      
      // 場所の表示
      if (info.event.extendedProps.location) {
        modal.querySelector('.event-location').textContent = '場所: ' + info.event.extendedProps.location;
        modal.querySelector('.event-location').style.display = 'block';
      } else {
        modal.querySelector('.event-location').style.display = 'none';
      }
      
      // 詳細の表示
      if (info.event.extendedProps.description) {
        modal.querySelector('.event-description').textContent = info.event.extendedProps.description;
        modal.querySelector('.event-description').style.display = 'block';
      } else {
        modal.querySelector('.event-description').style.display = 'none';
      }
      
      // モーダルを表示 (Bootstrap 4)
      $('#eventModal').modal('show');
    }
  });
  calendar.render();
});
</script>

<style>
/* カレンダーのカスタマイズ */
.fc {
  --fc-border-color: #E8DCC4;
  --fc-button-bg-color: #4A3D39;
  --fc-button-border-color: #4A3D39;
  --fc-button-hover-bg-color: #3A2D29;
  --fc-button-hover-border-color: #3A2D29;
  --fc-today-bg-color: #F6ECD4;
  --fc-event-bg-color: #4A3D39;
  --fc-event-border-color: #4A3D39;
}

/* イベントのスタイル */
.fc-event {
  cursor: pointer;
  transition: opacity 0.2s;
}

.fc-event:hover {
  opacity: 0.9;
}

/* モーダルのスタイル */
.modal-content {
  background-color: #F6ECD4;
}

.modal-header {
  border-bottom-color: #E8DCC4;
}

.modal-title {
  color: #4A3D39;
}

.event-time, .event-location, .event-description {
  color: #4A3D39;
  margin-bottom: 0.5rem;
}
</style>
