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
      themeSystem: 'bootstrap5',
      height: 'auto',
      firstDay: 0,  // 日曜始まり
      locale: 'ja',
      eventTimeFormat: {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      },
      // eventsはschedule.mdから直接データを渡すように変更
      events: [
        {
          title: 'サンプル予定1',
          start: '2024-03-24T09:00:00',
          end: '2024-03-24T10:30:00',
          location: 'オンライン',
          description: 'これはサンプルの予定です',
          color: '#4A3D39'
        }
      ]
    });
    calendar.render();
  });