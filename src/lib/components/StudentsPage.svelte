<script>
  import { onMount } from 'svelte';
  import Icon from '@iconify/svelte';

  let students = [
    {
      id: 1,
      name: 'Arjun Kumar',
      grade: '10th',
      section: 'A',
      rollNumber: '101',
      email: 'arjun.kumar@example.com',
      phone: '+91-98765-43210',
      address: '123 Main Street, Chennai',
      dateOfBirth: '2008-05-15',
      gender: 'Male',
      parentName: 'Rajesh Kumar',
      parentPhone: '+91-98765-43211',
      status: 'Active',
      attendance: 95,
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Tamil'],
      achievements: ['Science Fair Winner', 'Math Olympiad Bronze'],
      notes: 'Excellent in mathematics and science subjects.'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      grade: '9th',
      section: 'B',
      rollNumber: '205',
      email: 'priya.sharma@example.com',
      phone: '+91-98765-43212',
      address: '456 Park Avenue, Coimbatore',
      dateOfBirth: '2009-03-22',
      gender: 'Female',
      parentName: 'Vijay Sharma',
      parentPhone: '+91-98765-43213',
      status: 'Active',
      attendance: 98,
      subjects: ['Mathematics', 'Science', 'English', 'Social Studies', 'Tamil'],
      achievements: ['Debate Competition Winner'],
      notes: 'Active participant in extracurricular activities.'
    },
    {
      id: 3,
      name: 'Karthik Rajan',
      grade: '11th',
      section: 'A',
      rollNumber: '301',
      email: 'karthik.rajan@example.com',
      phone: '+91-98765-43214',
      address: '789 Temple Road, Madurai',
      dateOfBirth: '2007-08-10',
      gender: 'Male',
      parentName: 'Suresh Rajan',
      parentPhone: '+91-98765-43215',
      status: 'Active',
      attendance: 92,
      subjects: ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'English'],
      achievements: ['Sports Champion', 'Quiz Winner'],
      notes: 'Captain of the school cricket team.'
    }
  ];

  let searchQuery = '';
  let selectedGrade = 'all';
  let selectedSection = 'all';
  let selectedStatus = 'all';
  let showAddModal = false;
  let showEditModal = false;
  let selectedStudent = null;

  let newStudent = {
    name: '',
    grade: '',
    section: '',
    rollNumber: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    parentName: '',
    parentPhone: '',
    status: 'Active',
    subjects: [],
    achievements: [],
    notes: ''
  };

  let grades = ['6th', '7th', '8th', '9th', '10th', '11th', '12th'];
  let sections = ['A', 'B', 'C', 'D'];
  let statuses = ['Active', 'Inactive', 'Transferred'];
  let subjectOptions = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Science', 'English', 'Tamil', 'Social Studies', 'History', 'Geography', 'Computer Science'];

  $: filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         student.rollNumber.includes(searchQuery) ||
                         student.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    const matchesSection = selectedSection === 'all' || student.section === selectedSection;
    const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;
    return matchesSearch && matchesGrade && matchesSection && matchesStatus;
  });

  function addStudent() {
    const student = {
      ...newStudent,
      id: students.length + 1,
      attendance: 100,
      subjects: [...newStudent.subjects],
      achievements: [...newStudent.achievements]
    };
    students = [...students, student];
    resetNewStudent();
    showAddModal = false;
  }

  function editStudent(student) {
    selectedStudent = { ...student };
    showEditModal = true;
  }

  function updateStudent() {
    const index = students.findIndex(s => s.id === selectedStudent.id);
    if (index !== -1) {
      students[index] = { ...selectedStudent };
      students = [...students];
    }
    showEditModal = false;
    selectedStudent = null;
  }

  function deleteStudent(studentId) {
    students = students.filter(s => s.id !== studentId);
  }

  function resetNewStudent() {
    newStudent = {
      name: '',
      grade: '',
      section: '',
      rollNumber: '',
      email: '',
      phone: '',
      address: '',
      dateOfBirth: '',
      gender: '',
      parentName: '',
      parentPhone: '',
      status: 'Active',
      subjects: [],
      achievements: [],
      notes: ''
    };
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Inactive': return 'bg-red-100 text-red-800';
      case 'Transferred': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  function getAttendanceColor(attendance) {
    if (attendance >= 95) return 'text-green-600';
    if (attendance >= 85) return 'text-yellow-600';
    return 'text-red-600';
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN');
  }
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <div>
      <h1 class="text-3xl font-bold text-base-content">Students Management</h1>
      <p class="text-base-content/70 mt-1">Manage student information, attendance, and academic records</p>
    </div>
    <button
      class="btn btn-primary"
      on:click={() => showAddModal = true}
    >
      <Icon icon="mdi:plus" class="w-5 h-5" />
      Add Student
    </button>
  </div>

  <!-- Statistics Cards -->
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-primary">
        <Icon icon="mdi:school" class="w-8 h-8" />
      </div>
      <div class="stat-title">Total Students</div>
      <div class="stat-value text-primary">{students.length}</div>
    </div>
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-green-600">
        <Icon icon="mdi:account-check" class="w-8 h-8" />
      </div>
      <div class="stat-title">Active Students</div>
      <div class="stat-value text-green-600">{students.filter(s => s.status === 'Active').length}</div>
    </div>
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-blue-600">
        <Icon icon="mdi:calendar-check" class="w-8 h-8" />
      </div>
      <div class="stat-title">Avg Attendance</div>
      <div class="stat-value text-blue-600">{Math.round(students.reduce((sum, s) => sum + s.attendance, 0) / students.length)}%</div>
    </div>
    <div class="stat bg-base-100 rounded-lg shadow">
      <div class="stat-figure text-purple-600">
        <Icon icon="mdi:trophy" class="w-8 h-8" />
      </div>
      <div class="stat-title">Achievements</div>
      <div class="stat-value text-purple-600">{students.reduce((sum, s) => sum + s.achievements.length, 0)}</div>
    </div>
  </div>

  <!-- Filters -->
  <div class="bg-base-100 rounded-lg p-6 shadow">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="label" for="search-students">
          <span class="label-text">Search Students</span>
        </label>
        <input
          id="search-students"
          type="text"
          bind:value={searchQuery}
          placeholder="Name, roll number, or email..."
          class="input input-bordered w-full"
        />
      </div>
      <div>
        <label class="label" for="filter-grade">
          <span class="label-text">Grade</span>
        </label>
        <select id="filter-grade" bind:value={selectedGrade} class="select select-bordered w-full">
          <option value="all">All Grades</option>
          {#each grades as grade}
            <option value={grade}>{grade}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class="label" for="filter-section">
          <span class="label-text">Section</span>
        </label>
        <select id="filter-section" bind:value={selectedSection} class="select select-bordered w-full">
          <option value="all">All Sections</option>
          {#each sections as section}
            <option value={section}>{section}</option>
          {/each}
        </select>
      </div>
      <div>
        <label class="label" for="filter-status">
          <span class="label-text">Status</span>
        </label>
        <select id="filter-status" bind:value={selectedStatus} class="select select-bordered w-full">
          <option value="all">All Status</option>
          {#each statuses as status}
            <option value={status}>{status}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>

  <!-- Students Table -->
  <div class="bg-base-100 rounded-lg shadow overflow-hidden">
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Student Info</th>
            <th>Academic Details</th>
            <th>Contact</th>
            <th>Attendance</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {#each filteredStudents as student}
            <tr>
              <td>
                <div class="flex items-center space-x-3">
                  <div class="avatar placeholder">
                    <div class="bg-neutral-focus text-neutral-content rounded-full w-10">
                      <span class="text-sm">{student.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                  </div>
                  <div>
                    <div class="font-bold">{student.name}</div>
                    <div class="text-sm opacity-50">Roll: {student.rollNumber}</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="text-sm">
                  <div class="font-semibold">{student.grade} - {student.section}</div>
                  <div class="opacity-70">{student.subjects.slice(0, 3).join(', ')}{student.subjects.length > 3 ? '...' : ''}</div>
                </div>
              </td>
              <td>
                <div class="text-sm">
                  <div>{student.email}</div>
                  <div class="opacity-70">{student.phone}</div>
                </div>
              </td>
              <td>
                <span class="font-semibold {getAttendanceColor(student.attendance)}">
                  {student.attendance}%
                </span>
              </td>
              <td>
                <span class="badge {getStatusColor(student.status)}">
                  {student.status}
                </span>
              </td>
              <td>
                <div class="dropdown dropdown-left">
                  <button class="btn btn-ghost btn-sm">
                    <Icon icon="mdi:dots-vertical" class="w-5 h-5" />
                  </button>
                  <ul class="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    <li><button on:click={() => editStudent(student)}>Edit Student</button></li>
                    <li><button on:click={() => {/* View details action */}}>View Details</button></li>
                    <li><button on:click={() => {/* View achievements action */}}>View Achievements</button></li>
                    <li><button class="text-error" on:click={() => deleteStudent(student.id)}>Delete</button></li>
                  </ul>
                </div>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Add Student Modal -->
  {#if showAddModal}
    <div class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Add New Student</h3>
        <form on:submit|preventDefault={addStudent} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label" for="add-student-name">
                <span class="label-text">Full Name *</span>
              </label>
              <input
                id="add-student-name"
                type="text"
                bind:value={newStudent.name}
                placeholder="Enter full name"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label class="label" for="add-student-dob">
                <span class="label-text">Date of Birth</span>
              </label>
              <input
                id="add-student-dob"
                type="date"
                bind:value={newStudent.dateOfBirth}
                class="input input-bordered w-full"
              />
            </div>
            <div>
              <label class="label" for="add-student-grade">
                <span class="label-text">Grade *</span>
              </label>
              <select id="add-student-grade" bind:value={newStudent.grade} class="select select-bordered w-full" required>
                <option value="">Select Grade</option>
                {#each grades as grade}
                  <option value={grade}>{grade}</option>
                {/each}
              </select>
            </div>
            <div>
              <label class="label" for="add-student-section">
                <span class="label-text">Section *</span>
              </label>
              <select id="add-student-section" bind:value={newStudent.section} class="select select-bordered w-full" required>
                <option value="">Select Section</option>
                {#each sections as section}
                  <option value={section}>{section}</option>
                {/each}
              </select>
            </div>
            <div>
              <label class="label" for="add-student-roll">
                <span class="label-text">Roll Number *</span>
              </label>
              <input
                id="add-student-roll"
                type="text"
                bind:value={newStudent.rollNumber}
                placeholder="e.g., 101"
                class="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label class="label" for="add-student-gender">
                <span class="label-text">Gender</span>
              </label>
              <select id="add-student-gender" bind:value={newStudent.gender} class="select select-bordered w-full">
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label class="label" for="add-student-email">
                <span class="label-text">Email</span>
              </label>
              <input
                id="add-student-email"
                type="email"
                bind:value={newStudent.email}
                placeholder="student@example.com"
                class="input input-bordered w-full"
              />
            </div>
            <div>
              <label class="label" for="add-student-phone">
                <span class="label-text">Phone</span>
              </label>
              <input
                id="add-student-phone"
                type="tel"
                bind:value={newStudent.phone}
                placeholder="+91-98765-43210"
                class="input input-bordered w-full"
              />
            </div>
            <div class="md:col-span-2">
              <label class="label" for="add-student-address">
                <span class="label-text">Address</span>
              </label>
              <textarea
                id="add-student-address"
                bind:value={newStudent.address}
                placeholder="Enter address"
                rows="2"
                class="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <div>
              <label class="label" for="add-student-parent-name">
                <span class="label-text">Parent Name</span>
              </label>
              <input
                id="add-student-parent-name"
                type="text"
                bind:value={newStudent.parentName}
                placeholder="Parent/Guardian name"
                class="input input-bordered w-full"
              />
            </div>
            <div>
              <label class="label" for="add-student-parent-phone">
                <span class="label-text">Parent Phone</span>
              </label>
              <input
                id="add-student-parent-phone"
                type="tel"
                bind:value={newStudent.parentPhone}
                placeholder="+91-98765-43211"
                class="input input-bordered w-full"
              />
            </div>
          </div>
          <div class="modal-action">
            <button type="button" class="btn" on:click={() => { showAddModal = false; resetNewStudent(); }}>Cancel</button>
            <button type="submit" class="btn btn-primary">Add Student</button>
          </div>
        </form>
      </div>
    </div>
  {/if}

  <!-- Edit Student Modal -->
  {#if showEditModal && selectedStudent}
    <div class="modal modal-open">
      <div class="modal-box max-w-4xl">
        <h3 class="font-bold text-lg mb-4">Edit Student</h3>
        <form on:submit|preventDefault={updateStudent} class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="label" for="edit-student-name">
                <span class="label-text">Full Name *</span>
              </label>
              <input
                id="edit-student-name"
                type="text"
                bind:value={selectedStudent.name}
                class="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label class="label" for="edit-student-dob">
                <span class="label-text">Date of Birth</span>
              </label>
              <input
                id="edit-student-dob"
                type="date"
                bind:value={selectedStudent.dateOfBirth}
                class="input input-bordered w-full"
              />
            </div>
            <div>
              <label class="label" for="edit-student-grade">
                <span class="label-text">Grade *</span>
              </label>
              <select id="edit-student-grade" bind:value={selectedStudent.grade} class="select select-bordered w-full" required>
                {#each grades as grade}
                  <option value={grade}>{grade}</option>
                {/each}
              </select>
            </div>
            <div>
              <label class="label" for="edit-student-section">
                <span class="label-text">Section *</span>
              </label>
              <select id="edit-student-section" bind:value={selectedStudent.section} class="select select-bordered w-full" required>
                {#each sections as section}
                  <option value={section}>{section}</option>
                {/each}
              </select>
            </div>
            <div>
              <label class="label" for="edit-student-roll">
                <span class="label-text">Roll Number *</span>
              </label>
              <input
                id="edit-student-roll"
                type="text"
                bind:value={selectedStudent.rollNumber}
                class="input input-bordered w-full"
                required
              />
            </div>
            <div>
              <label class="label" for="edit-student-status">
                <span class="label-text">Status</span>
              </label>
              <select id="edit-student-status" bind:value={selectedStudent.status} class="select select-bordered w-full">
                {#each statuses as status}
                  <option value={status}>{status}</option>
                {/each}
              </select>
            </div>
          </div>
          <div class="modal-action">
            <button type="button" class="btn" on:click={() => { showEditModal = false; selectedStudent = null; }}>Cancel</button>
            <button type="submit" class="btn btn-primary">Update Student</button>
          </div>
        </form>
      </div>
    </div>
  {/if}
</div>