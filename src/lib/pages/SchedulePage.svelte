<script>
  import { onMount, onDestroy, tick } from 'svelte';
  import { _ } from 'svelte-i18n';
  import Icon from '@iconify/svelte';
  import { motionInView, motionHover } from '../utils/motion.js';
  import FullCalendar from 'svelte-fullcalendar';
  import dayGridPlugin from '@fullcalendar/daygrid';
  import timeGridPlugin from '@fullcalendar/timegrid';
  import interactionPlugin from '@fullcalendar/interaction';
  import listPlugin from '@fullcalendar/list';
  import multiMonthPlugin from '@fullcalendar/multimonth';
  
  let calendarRef;
  let calendar;
  let calendarContainer;
  let showEventModal = false;
  let showCreateEventModal = false;
  let selectedEvent = null;
  
  // Calendar state
  let currentView = 'dayGridMonth';
  let isLoading = true;
  let calendarError = null;
  
  // Calendar view options
  let selectedViewOption = 'month';
  const viewOptions = [
    { value: 'month', label: 'Month', view: 'dayGridMonth', icon: 'heroicons:calendar-days' },
    { value: 'week', label: 'Week', view: 'timeGridWeek', icon: 'heroicons:calendar' },
    { value: 'day', label: 'Day', view: 'timeGridDay', icon: 'heroicons:calendar-date-range' },
    { value: 'list', label: 'List', view: 'listMonth', icon: 'heroicons:list-bullet' }
  ];
  
  // Event form data
  let eventForm = {
    id: null,
    title: '',
    start: '',
    end: '',
    allDay: false,
    description: '',
    color: '#3788d8',
    location: ''
  };
  
  // Sample events data with more variety
  let events = [
    {
      id: '1',
      title: 'Team Standup',
      start: new Date(Date.now() + 86400000),
      end: new Date(Date.now() + 86400000 + 1800000), // 30 min
      color: '#10b981',
      backgroundColor: '#10b981',
      borderColor: '#10b981',
      allDay: false,
      extendedProps: {
        description: 'Daily team sync and updates',
        location: 'Conference Room A'
      }
    },
    {
      id: '2',
      title: 'Project Deadline',
      start: new Date(Date.now() + 2 * 86400000),
      allDay: true,
      color: '#ef4444',
      backgroundColor: '#ef4444',
      borderColor: '#ef4444',
      extendedProps: {
        description: 'Final project submission deadline',
        location: ''
      }
    },
    {
      id: '3',
      title: 'Client Presentation',
      start: new Date(Date.now() + 3 * 86400000 + 2 * 3600000),
      end: new Date(Date.now() + 3 * 86400000 + 3 * 3600000),
      color: '#8b5cf6',
      backgroundColor: '#8b5cf6',
      borderColor: '#8b5cf6',
      allDay: false,
      extendedProps: {
        description: 'Quarterly review presentation',
        location: 'Meeting Room B'
      }
    },
    {
      id: '4',
      title: 'Product Launch',
      start: new Date(Date.now() + 7 * 86400000),
      allDay: true,
      color: '#f59e0b',
      backgroundColor: '#f59e0b',
      borderColor: '#f59e0b',
      extendedProps: {
        description: 'New product launch event',
        location: ''
      }
    }
  ];
  
  // Quick stats
  $: upcomingEvents = events.filter(event => new Date(event.start) > new Date()).length;
  $: todayEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.start);
    return eventDate.toDateString() === today.toDateString();
  }).length;
  $: thisWeekEvents = events.filter(event => {
    const today = new Date();
    const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const eventDate = new Date(event.start);
    return eventDate >= today && eventDate <= weekFromNow;
  }).length;
  
  // Calendar options - will update when selectedViewOption changes
  $: calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin],
    initialView: getCalendarView(selectedViewOption),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    height: 'auto',
    events: events,
    eventClick: handleEventClick,
    select: handleDateSelect,
    editable: true,
    selectable: true,
    dayMaxEvents: 3,
    eventDisplay: 'block',
    displayEventTime: true,
    eventTimeFormat: {
      hour: 'numeric',
      minute: '2-digit',
      meridiem: 'short'
    },
    eventDrop: handleEventDrop,
    eventResize: handleEventResize,
    dateClick: handleDateClick,
    businessHours: {
      daysOfWeek: [1, 2, 3, 4, 5],
      startTime: '09:00',
      endTime: '18:00'
    },
    slotMinTime: '06:00:00',
    slotMaxTime: '22:00:00',
    nowIndicator: true,
    selectMirror: true,
    weekends: true,
    // List view specific options
    listDayFormat: { weekday: 'long' },
    listDaySideFormat: false,
    noEventsContent: 'No events to display'
  };
  
  function getCalendarView(option) {
    const view = viewOptions.find(v => v.value === option);
    return view ? view.view : 'dayGridMonth';
  }
  
  function changeView(option) {
    console.log('Changing view to:', option, 'which maps to:', getCalendarView(option));
    selectedViewOption = option;
    // Force calendar to re-render with new view
    tick().then(() => {
      if (calendarRef) {
        try {
          const calendarApi = calendarRef.getCalendar();
          if (calendarApi) {
            console.log('Calling changeView on calendar API:', getCalendarView(option));
            calendarApi.changeView(getCalendarView(option));
            console.log('View changed successfully');
          }
        } catch (error) {
          console.log('Calendar API error:', error);
          console.log('Calendar API not ready, will use reactive update');
          // The reactive calendarOptions will handle the view change
        }
      }
    });
  }
  
  onMount(async () => {
    try {
      await tick();
      isLoading = false;
    } catch (error) {
      console.error('Error loading FullCalendar:', error);
      calendarError = 'Failed to load calendar';
      isLoading = false;
    }
  });
  
  function handleEventClick(info) {
    selectedEvent = {
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      allDay: info.event.allDay,
      description: info.event.extendedProps.description || '',
      color: info.event.backgroundColor || '#3788d8',
      location: info.event.extendedProps.location || ''
    };
    showEventModal = true;
  }
  
  function handleDateSelect(info) {
    eventForm = {
      id: null,
      title: '',
      start: formatDateForInput(info.start, !info.allDay),
      end: formatDateForInput(info.end, !info.allDay),
      allDay: info.allDay,
      description: '',
      color: '#3788d8',
      location: ''
    };
    showCreateEventModal = true;
  }
  
  function handleDateClick(info) {
    const clickedDate = info.date;
    const now = new Date();
    const endTime = new Date(clickedDate.getTime() + 3600000); // 1 hour later
    
    eventForm = {
      id: null,
      title: '',
      start: formatDateForInput(clickedDate, true),
      end: formatDateForInput(endTime, true),
      allDay: false,
      description: '',
      color: '#3788d8',
      location: ''
    };
    showCreateEventModal = true;
  }
  
  function handleEventDrop(info) {
    const event = info.event;
    const eventIndex = events.findIndex(e => e.id === event.id);
    
    if (eventIndex !== -1) {
      events[eventIndex] = {
        ...events[eventIndex],
        start: event.start,
        end: event.end,
        allDay: event.allDay
      };
      events = [...events];
    }
  }
  
  function handleEventResize(info) {
    const event = info.event;
    const eventIndex = events.findIndex(e => e.id === event.id);
    
    if (eventIndex !== -1) {
      events[eventIndex] = {
        ...events[eventIndex],
        start: event.start,
        end: event.end
      };
      events = [...events];
    }
  }
  
  function formatDateForInput(date, includeTime = true) {
    if (!date) return '';
    const d = new Date(date);
    if (includeTime) {
      return d.toISOString().slice(0, 16);
    } else {
      return d.toISOString().slice(0, 10);
    }
  }
  
  function saveEvent() {
    if (!eventForm.title.trim()) {
      alert('Title is required');
      return;
    }
    
    const newEvent = {
      id: eventForm.id || generateEventId(),
      title: eventForm.title,
      start: new Date(eventForm.start),
      end: eventForm.end ? new Date(eventForm.end) : null,
      allDay: eventForm.allDay,
      color: eventForm.color,
      backgroundColor: eventForm.color,
      borderColor: eventForm.color,
      extendedProps: {
        description: eventForm.description,
        location: eventForm.location
      }
    };
    
    if (eventForm.id) {
      const eventIndex = events.findIndex(e => e.id === eventForm.id);
      if (eventIndex !== -1) {
        events[eventIndex] = newEvent;
        events = [...events];
      }
    } else {
      events = [...events, newEvent];
    }
    
    closeCreateEventModal();
  }
  
  function deleteEvent() {
    if (selectedEvent && selectedEvent.id) {
      events = events.filter(e => e.id !== selectedEvent.id);
      closeEventModal();
    }
  }
  
  function editEvent() {
    if (selectedEvent) {
      eventForm = {
        id: selectedEvent.id,
        title: selectedEvent.title,
        start: formatDateForInput(selectedEvent.start, !selectedEvent.allDay),
        end: formatDateForInput(selectedEvent.end, !selectedEvent.allDay),
        allDay: selectedEvent.allDay,
        description: selectedEvent.description,
        color: selectedEvent.color,
        location: selectedEvent.location
      };
      
      closeEventModal();
      showCreateEventModal = true;
    }
  }
  
  function closeEventModal() {
    showEventModal = false;
    selectedEvent = null;
  }
  
  function closeCreateEventModal() {
    showCreateEventModal = false;
    eventForm = {
      id: null,
      title: '',
      start: '',
      end: '',
      allDay: false,
      description: '',
      color: '#3788d8',
      location: ''
    };
  }
  
  function createQuickEvent() {
    const now = new Date();
    const nextHour = new Date(now.getTime() + 3600000);
    
    eventForm = {
      id: null,
      title: '',
      start: formatDateForInput(now, true),
      end: formatDateForInput(nextHour, true),
      allDay: false,
      description: '',
      color: '#3788d8',
      location: ''
    };
    
    showCreateEventModal = true;
  }
  
  function generateEventId() {
    return 'event_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
</script>

<svelte:head>
  <title>{$_('navigation.schedule') || 'Schedule'} - Dashboard</title>
</svelte:head>

<div class="space-y-8">
  <!-- Page header -->
  <div class="border-b border-base-300 pb-6" use:motionInView={{ animation: 'fadeInDown' }}>
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-base-content">{$_('navigation.schedule') || 'Schedule'}</h1>
        <p class="mt-2 text-sm text-base-content/60">
          Manage your events, appointments, and calendar schedule
        </p>
      </div>
      <button 
        class="btn btn-primary shadow-lg hover:text-primary-content"
        on:click={createQuickEvent}
        use:motionHover
      >
        <Icon icon="heroicons:plus" class="w-5 h-5 mr-2" />
        New Event
      </button>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" use:motionInView={{ animation: 'fadeInUp' }}>
    <div class="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-200" use:motionHover>
      <div class="card-body p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon icon="heroicons:calendar-days" class="w-6 h-6 text-primary" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/60">Today's Events</p>
            <p class="text-2xl font-bold text-base-content">{todayEvents}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-200" use:motionHover>
      <div class="card-body p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Icon icon="heroicons:clock" class="w-6 h-6 text-secondary" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/60">This Week</p>
            <p class="text-2xl font-bold text-base-content">{thisWeekEvents}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-200" use:motionHover>
      <div class="card-body p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon icon="heroicons:arrow-trending-up" class="w-6 h-6 text-accent" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/60">Upcoming</p>
            <p class="text-2xl font-bold text-base-content">{upcomingEvents}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-200" use:motionHover>
      <div class="card-body p-6">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <div class="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center">
              <Icon icon="heroicons:calendar" class="w-6 h-6 text-info" />
            </div>
          </div>
          <div class="ml-4 flex-1">
            <p class="text-sm font-medium text-base-content/60">Total Events</p>
            <p class="text-2xl font-bold text-base-content">{events.length}</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Calendar Controls -->
  <div class="card bg-base-100 shadow-sm border border-base-300" use:motionInView={{ animation: 'fadeInUp' }}>
    <div class="card-body p-6">
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 class="text-lg font-semibold text-base-content">Calendar View</h2>
          <p class="text-sm text-base-content/60">Choose how you want to view your schedule</p>
        </div>
        
        <div class="flex items-center gap-2">
          <div class="join">
            {#each viewOptions as option (option.value)}
              <button
                class="btn join-item btn-sm {selectedViewOption === option.value ? 'btn-primary' : 'btn-outline'}"
                on:click={() => changeView(option.value)}
                use:motionHover
              >
                <Icon icon={option.icon} class="w-4 h-4 sm:mr-2" />
                <span class="hidden sm:inline">{option.label}</span>
              </button>
            {/each}
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Calendar Container -->
  <div class="card bg-base-100 shadow-sm border border-base-300" use:motionInView={{ animation: 'fadeInUp' }}>
    <div class="card-body p-0">
      {#if isLoading}
        <div class="flex items-center justify-center h-96">
          <div class="text-center">
            <div class="loading loading-spinner loading-lg text-primary mb-4"></div>
            <p class="text-base-content/70">Loading calendar...</p>
          </div>
        </div>
      {:else if calendarError}
        <div class="flex items-center justify-center h-96">
          <div class="text-center">
            <Icon icon="heroicons:exclamation-triangle" class="w-16 h-16 text-error mx-auto mb-4" />
            <h3 class="text-lg font-semibold text-base-content mb-2">Calendar Error</h3>
            <p class="text-base-content/70 mb-4">{calendarError}</p>
            <button class="btn btn-primary" on:click={() => window.location.reload()}>
              <Icon icon="heroicons:arrow-path" class="w-4 h-4 mr-2" />
              Reload Page
            </button>
          </div>
        </div>
      {:else}
        <div bind:this={calendarContainer} class="calendar-container p-6">
          <FullCalendar 
            bind:this={calendarRef}
            options={calendarOptions}
            key={selectedViewOption}
          />
        </div>
      {/if}
    </div>
  </div>
</div>

<!-- Event Details Modal -->
{#if showEventModal && selectedEvent}
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-md" use:motionInView={{ animation: 'scaleIn' }}>
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={closeEventModal}>✕</button>
      
      <div class="space-y-6">
        <div class="flex items-start gap-3">
          <div class="w-4 h-4 rounded-full mt-1" style="background-color: {selectedEvent.color}"></div>
          <div class="flex-1">
            <h3 class="text-xl font-bold text-base-content">{selectedEvent.title}</h3>
            {#if selectedEvent.description}
              <p class="text-base-content/70 mt-1">{selectedEvent.description}</p>
            {/if}
          </div>
        </div>
        
        <div class="space-y-4">
          <div class="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
            <Icon icon="heroicons:clock" class="w-5 h-5 text-base-content/60" />
            <div>
              <p class="text-sm font-medium text-base-content">
                {#if selectedEvent.allDay}
                  All Day Event
                {:else}
                  {new Date(selectedEvent.start).toLocaleString()} 
                  {#if selectedEvent.end}
                    - {new Date(selectedEvent.end).toLocaleString()}
                  {/if}
                {/if}
              </p>
            </div>
          </div>
          
          {#if selectedEvent.location}
            <div class="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
              <Icon icon="heroicons:map-pin" class="w-5 h-5 text-base-content/60" />
              <div>
                <p class="text-sm font-medium text-base-content">{selectedEvent.location}</p>
              </div>
            </div>
          {/if}
        </div>
        
        <div class="flex justify-between pt-4 border-t border-base-300">
          <button class="btn btn-error btn-outline" on:click={deleteEvent}>
            <Icon icon="heroicons:trash" class="w-4 h-4 mr-2" />
            Delete
          </button>
          <div class="flex gap-2">
            <button class="btn btn-ghost" on:click={closeEventModal}>
              Cancel
            </button>
            <button class="btn btn-primary" on:click={editEvent}>
              <Icon icon="heroicons:pencil" class="w-4 h-4 mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
{/if}

<!-- Create/Edit Event Modal -->
{#if showCreateEventModal}
  <div class="modal modal-open">
    <div class="modal-box w-11/12 max-w-2xl max-h-[90vh] overflow-y-auto" use:motionInView={{ animation: 'scaleIn' }}>
      <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={closeCreateEventModal}>✕</button>
      
      <div class="space-y-6">
        <div>
          <h3 class="text-xl font-bold text-base-content">
            {eventForm.id ? 'Edit Event' : 'Create New Event'}
          </h3>
          <p class="text-base-content/60 mt-1">
            {eventForm.id ? 'Update event details' : 'Add a new event to your calendar'}
          </p>
        </div>
        
        <form on:submit|preventDefault={saveEvent} class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="md:col-span-2">
              <label class="label">
                <span class="label-text font-medium">Event Title *</span>
              </label>
              <input 
                type="text" 
                bind:value={eventForm.title}
                placeholder="Enter event title"
                class="input input-bordered w-full focus:input-primary" 
                required
              />
            </div>
            
            <div>
              <label class="label">
                <span class="label-text font-medium">Start {eventForm.allDay ? 'Date' : 'Time'}</span>
              </label>
              <input 
                type={eventForm.allDay ? 'date' : 'datetime-local'}
                bind:value={eventForm.start}
                class="input input-bordered w-full focus:input-primary"
                required
              />
            </div>
            
            {#if !eventForm.allDay}
              <div>
                <label class="label">
                  <span class="label-text font-medium">End Time</span>
                </label>
                <input 
                  type="datetime-local"
                  bind:value={eventForm.end}
                  class="input input-bordered w-full focus:input-primary"
                />
              </div>
            {/if}
            
            <div class="md:col-span-2">
              <div class="form-control">
                <label class="label cursor-pointer justify-start gap-3">
                  <input type="checkbox" bind:checked={eventForm.allDay} class="checkbox checkbox-primary" />
                  <span class="label-text font-medium">All Day Event</span>
                </label>
              </div>
            </div>
            
            <div>
              <label class="label">
                <span class="label-text font-medium">Color</span>
              </label>
              <div class="flex items-center gap-3">
                <input 
                  type="color" 
                  bind:value={eventForm.color}
                  class="w-16 h-10 rounded-lg border border-base-300 cursor-pointer"
                />
                <input 
                  type="text" 
                  bind:value={eventForm.color}
                  class="input input-bordered flex-1 focus:input-primary"
                  placeholder="#3788d8"
                />
              </div>
            </div>
            
            <div>
              <label class="label">
                <span class="label-text font-medium">Location</span>
              </label>
              <input 
                type="text" 
                bind:value={eventForm.location}
                placeholder="Enter location"
                class="input input-bordered w-full focus:input-primary"
              />
            </div>
            
            <div class="md:col-span-2">
              <label class="label">
                <span class="label-text font-medium">Description</span>
              </label>
              <textarea 
                bind:value={eventForm.description}
                placeholder="Enter event description"
                class="textarea textarea-bordered h-24 focus:textarea-primary"
              ></textarea>
            </div>
          </div>
          
          <div class="flex justify-end gap-3 pt-6 border-t border-base-300">
            <button type="button" class="btn btn-ghost" on:click={closeCreateEventModal}>
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              <Icon icon="heroicons:check" class="w-4 h-4 mr-2" />
              {eventForm.id ? 'Update Event' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  /* FullCalendar modern styling */
  :global(.fc) {
    font-family: inherit;
  }
  
  :global(.fc-toolbar) {
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  
  :global(.fc-toolbar-title) {
    font-size: 1.5rem;
    font-weight: 700;
    color: hsl(var(--bc));
  }
  
  :global(.fc-button) {
    background: hsl(var(--p)) !important;
    border-color: hsl(var(--p)) !important;
    color: hsl(var(--pc)) !important;
    border-radius: 0.5rem !important;
    padding: 0.5rem 1rem !important;
    font-size: 0.875rem !important;
    font-weight: 500 !important;
    text-transform: none !important;
    transition: all 0.2s ease !important;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
  }
  
  :global(.fc-button:hover) {
    background: hsl(var(--pf)) !important;
    border-color: hsl(var(--pf)) !important;
    transform: translateY(-1px) !important;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
  }
  
  :global(.fc-button:focus) {
    box-shadow: 0 0 0 2px hsl(var(--pf) / 0.2) !important;
    outline: none !important;
  }
  
  :global(.fc-button-active) {
    background: hsl(var(--pf)) !important;
    border-color: hsl(var(--pf)) !important;
  }
  
  :global(.fc-daygrid-event) {
    border-radius: 0.375rem !important;
    border: none !important;
    padding: 0.25rem 0.5rem !important;
    font-size: 0.75rem !important;
    font-weight: 500 !important;
    margin: 0.125rem 0 !important;
    box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05) !important;
  }
  
  :global(.fc-event-title) {
    font-weight: 500;
  }
  
  :global(.fc-day-today) {
    background: hsl(var(--b2)) !important;
  }
  
  :global(.fc-col-header-cell) {
    background: hsl(var(--b1));
    color: hsl(var(--bc));
    font-weight: 600;
    padding: 1rem 0;
    border-color: hsl(var(--b3));
    font-size: 0.875rem;
  }
  
  :global(.fc-daygrid-day) {
    border-color: hsl(var(--b3)) !important;
  }
  
  :global(.fc-timegrid-slot) {
    border-color: hsl(var(--b3)) !important;
  }
  
  :global(.fc-timegrid-axis) {
    border-color: hsl(var(--b3)) !important;
  }
  
  :global(.fc-scrollgrid) {
    border-radius: 0.5rem;
    overflow: hidden;
    border-color: hsl(var(--b3)) !important;
  }
  
  /* Mobile responsive adjustments */
  @media (max-width: 768px) {
    :global(.fc-toolbar) {
      flex-direction: column;
      align-items: stretch;
      gap: 1rem;
    }
    
    :global(.fc-toolbar-chunk) {
      display: flex;
      justify-content: center;
      margin: 0;
    }
    
    :global(.fc-button) {
      padding: 0.375rem 0.75rem !important;
      font-size: 0.75rem !important;
    }
    
    :global(.fc-toolbar-title) {
      font-size: 1.25rem;
      text-align: center;
    }
  }
  
  /* Event hover effects */
  :global(.fc-event:hover) {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
  }
  
  /* Loading state */
  .calendar-container.loading {
    opacity: 0.6;
    pointer-events: none;
  }
  
  /* Custom modal scrollbar */
  .modal-box {
    scrollbar-width: thin;
    scrollbar-color: hsl(var(--bc) / 0.2) transparent;
  }
  
  .modal-box::-webkit-scrollbar {
    width: 6px;
  }
  
  .modal-box::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .modal-box::-webkit-scrollbar-thumb {
    background: hsl(var(--bc) / 0.2);
    border-radius: 3px;
  }
  
  .modal-box::-webkit-scrollbar-thumb:hover {
    background: hsl(var(--bc) / 0.3);
  }
</style> 