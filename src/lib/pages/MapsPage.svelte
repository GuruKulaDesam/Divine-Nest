<script>
  import Icon from '@iconify/svelte';
  import { onMount, onDestroy, tick } from 'svelte';
  import { motionInView, motionHover, animations } from '../utils/motion.js';
  import { _ } from 'svelte-i18n';
  import { fade, scale } from 'svelte/transition';

  // Map variables
  let mapContainer;
  let map;
  let L;
  let mapInitializing = false;

  // Pagination
  let currentPage = 1;
  let itemsPerPage = 6;
  let totalPages = 1;

  // Job data with international locations
  let jobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "Meta",
      companyLogo: "https://logo.clearbit.com/meta.com",
      address: "New York, NY, USA",
      coordinates: [40.7128, -74.0060],
      type: "Full-time",
      experience: "Senior Level",
      salary: "$120,000 - $160,000",
      description: "Build the future of social technology with React and modern web technologies.",
      applicants: 45,
      posted: "2 days ago",
      featured: true,
      urgent: false
    },
    {
      id: 2,
      title: "DevOps Engineer",
      company: "Google",
      companyLogo: "https://logo.clearbit.com/google.com",
      address: "San Francisco, CA, USA",
      coordinates: [37.7749, -122.4194],
      type: "Remote",
      experience: "Mid Level",
      salary: "$100,000 - $140,000",
      description: "Scale infrastructure for billions of users with cutting-edge cloud technologies.",
      applicants: 67,
      posted: "1 week ago",
      featured: false,
      urgent: true
    },
    {
      id: 3,
      title: "Product Manager",
      company: "Netflix",
      companyLogo: "https://logo.clearbit.com/netflix.com",
      address: "Los Angeles, CA, USA",
      coordinates: [34.0522, -118.2437],
      type: "Hybrid",
      experience: "Senior Level",
      salary: "$130,000 - $180,000",
      description: "Drive product strategy for entertainment technology used by millions worldwide.",
      applicants: 89,
      posted: "3 days ago",
      featured: true,
      urgent: false
    },
    {
      id: 4,
      title: "Software Engineer",
      company: "Shopify",
      companyLogo: "https://logo.clearbit.com/shopify.com",
      address: "Toronto, ON, Canada",
      coordinates: [43.6532, -79.3832],
      type: "Full-time",
      experience: "Mid Level",
      salary: "CAD $85,000 - $120,000",
      description: "Join our team to build commerce solutions that power millions of businesses worldwide.",
      applicants: 34,
      posted: "4 days ago",
      featured: false,
      urgent: false
    },
    {
      id: 5,
      title: "Frontend Developer",
      company: "Spotify",
      companyLogo: "https://logo.clearbit.com/spotify.com",
      address: "Stockholm, Sweden",
      coordinates: [59.3293, 18.0686],
      type: "Full-time",
      experience: "Senior Level",
      salary: "€65,000 - €90,000",
      description: "Create amazing user experiences for music lovers around the globe.",
      applicants: 78,
      posted: "1 week ago",
      featured: true,
      urgent: false
    },
    {
      id: 6,
      title: "Data Scientist",
      company: "SAP",
      companyLogo: "https://logo.clearbit.com/sap.com",
      address: "Berlin, Germany",
      coordinates: [52.5200, 13.4050],
      type: "Hybrid",
      experience: "Senior Level",
      salary: "€70,000 - €95,000",
      description: "Lead data initiatives and machine learning projects for enterprise solutions.",
      applicants: 56,
      posted: "5 days ago",
      featured: false,
      urgent: true
    },
    {
      id: 7,
      title: "Full Stack Developer",
      company: "Atlassian",
      companyLogo: "https://logo.clearbit.com/atlassian.com",
      address: "Sydney, NSW, Australia",
      coordinates: [-33.8688, 151.2093],
      type: "Full-time",
      experience: "Mid Level",
      salary: "AUD $90,000 - $130,000",
      description: "Build and maintain tools that help teams collaborate and work better together.",
      applicants: 42,
      posted: "3 days ago",
      featured: false,
      urgent: false
    },
    {
      id: 8,
      title: "Mobile Developer",
      company: "Gojek",
      companyLogo: "https://logo.clearbit.com/gojek.com",
      address: "Jakarta, Indonesia",
      coordinates: [-6.2088, 106.8456],
      type: "Full-time",
      experience: "Mid Level",
      salary: "IDR 180,000,000 - 250,000,000",
      description: "Develop mobile applications that serve millions of users across Southeast Asia.",
      applicants: 67,
      posted: "2 days ago",
      featured: true,
      urgent: false
    },
    {
      id: 9,
      title: "Backend Engineer",
      company: "Rakuten",
      companyLogo: "https://logo.clearbit.com/rakuten.com",
      address: "Tokyo, Japan",
      coordinates: [35.6762, 139.6503],
      type: "Full-time",
      experience: "Senior Level",
      salary: "¥8,000,000 - ¥12,000,000",
      description: "Build scalable backend services for one of Japan's largest e-commerce platforms.",
      applicants: 29,
      posted: "1 week ago",
      featured: false,
      urgent: true
    },
    {
      id: 10,
      title: "Cloud Architect",
      company: "Tencent",
      companyLogo: "https://logo.clearbit.com/tencent.com",
      address: "Shenzhen, China",
      coordinates: [22.5431, 114.0579],
      type: "Full-time",
      experience: "Senior Level",
      salary: "¥400,000 - ¥600,000",
      description: "Design and implement cloud infrastructure solutions for millions of users.",
      applicants: 38,
      posted: "6 days ago",
      featured: true,
      urgent: false
    },
    {
      id: 11,
      title: "UI/UX Designer",
      company: "Zomato",
      companyLogo: "https://logo.clearbit.com/zomato.com",
      address: "Mumbai, India",
      coordinates: [19.0760, 72.8777],
      type: "Full-time",
      experience: "Mid Level",
      salary: "₹1,200,000 - ₹1,800,000",
      description: "Design intuitive user experiences for food delivery and restaurant discovery.",
      applicants: 85,
      posted: "4 days ago",
      featured: false,
      urgent: false
    },
    {
      id: 12,
      title: "Security Engineer",
      company: "ASML",
      companyLogo: "https://logo.clearbit.com/asml.com",
      address: "Eindhoven, Netherlands",
      coordinates: [51.4416, 5.4697],
      type: "Full-time",
      experience: "Senior Level",
      salary: "€75,000 - €105,000",
      description: "Protect cutting-edge semiconductor technology and secure global operations.",
      applicants: 23,
      posted: "1 week ago",
      featured: false,
      urgent: true
    },
    {
      id: 13,
      title: "Machine Learning Engineer",
      company: "DeepMind",
      companyLogo: "https://logo.clearbit.com/deepmind.com",
      address: "London, UK",
      coordinates: [51.5074, -0.1278],
      type: "Full-time",
      experience: "Senior Level",
      salary: "£80,000 - £120,000",
      description: "Advance the state of AI research and build systems that can think and learn.",
      applicants: 156,
      posted: "2 days ago",
      featured: true,
      urgent: false
    },
    {
      id: 14,
      title: "iOS Developer",
      company: "Apple",
      companyLogo: "https://logo.clearbit.com/apple.com",
      address: "Cupertino, CA, USA",
      coordinates: [37.3230, -122.0322],
      type: "Full-time",
      experience: "Mid Level",
      salary: "$110,000 - $150,000",
      description: "Create innovative iOS applications used by millions of customers worldwide.",
      applicants: 203,
      posted: "3 days ago",
      featured: true,
      urgent: true
    },
    {
      id: 15,
      title: "Backend Developer",
      company: "Microsoft",
      companyLogo: "https://logo.clearbit.com/microsoft.com",
      address: "Seattle, WA, USA",
      coordinates: [47.6062, -122.3321],
      type: "Full-time",
      experience: "Mid Level",
      salary: "$95,000 - $135,000",
      description: "Build scalable cloud services and APIs that power productivity for millions.",
      applicants: 87,
      posted: "5 days ago",
      featured: false,
      urgent: false
    },
    {
      id: 16,
      title: "Data Analyst",
      company: "Uber",
      companyLogo: "https://logo.clearbit.com/uber.com",
      address: "Amsterdam, Netherlands",
      coordinates: [52.3676, 4.9041],
      type: "Full-time",
      experience: "Entry Level",
      salary: "€45,000 - €65,000",
      description: "Analyze mobility data to improve transportation solutions across Europe.",
      applicants: 124,
      posted: "1 week ago",
      featured: false,
      urgent: false
    },
    {
      id: 17,
      title: "Cybersecurity Specialist",
      company: "Kaspersky",
      companyLogo: "https://logo.clearbit.com/kaspersky.com",
      address: "Moscow, Russia",
      coordinates: [55.7558, 37.6176],
      type: "Full-time",
      experience: "Senior Level",
      salary: "₽2,500,000 - ₽3,500,000",
      description: "Protect global organizations from cyber threats and security vulnerabilities.",
      applicants: 45,
      posted: "4 days ago",
      featured: false,
      urgent: true
    },
    {
      id: 18,
      title: "Game Developer",
      company: "Ubisoft",
      companyLogo: "https://logo.clearbit.com/ubisoft.com",
      address: "Montreal, QC, Canada",
      coordinates: [45.5017, -73.5673],
      type: "Full-time",
      experience: "Mid Level",
      salary: "CAD $70,000 - $95,000",
      description: "Create immersive gaming experiences for console and PC platforms.",
      applicants: 178,
      posted: "6 days ago",
      featured: true,
      urgent: false
    },
    {
      id: 19,
      title: "AI Research Scientist",
      company: "OpenAI",
      companyLogo: "https://logo.clearbit.com/openai.com",
      address: "San Francisco, CA, USA",
      coordinates: [37.7749, -122.4194],
      type: "Full-time",
      experience: "Senior Level",
      salary: "$200,000 - $300,000",
      description: "Research and develop artificial general intelligence to benefit all humanity.",
      applicants: 312,
      posted: "1 day ago",
      featured: true,
      urgent: true
    },
    {
      id: 20,
      title: "Marketing Manager",
      company: "HubSpot",
      companyLogo: "https://logo.clearbit.com/hubspot.com",
      address: "Dublin, Ireland",
      coordinates: [53.3498, -6.2603],
      type: "Full-time",
      experience: "Mid Level",
      salary: "€55,000 - €75,000",
      description: "Drive marketing campaigns and growth strategies for European markets.",
      applicants: 95,
      posted: "1 week ago",
      featured: false,
      urgent: false
    },
    {
      id: 21,
      title: "Blockchain Developer",
      company: "Coinbase",
      companyLogo: "https://logo.clearbit.com/coinbase.com",
      address: "London, UK",
      coordinates: [51.5074, -0.1278],
      type: "Remote",
      experience: "Senior Level",
      salary: "£90,000 - £130,000",
      description: "Build the future of cryptocurrency and decentralized finance applications.",
      applicants: 167,
      posted: "3 days ago",
      featured: true,
      urgent: false
    },
    {
      id: 22,
      title: "Quality Assurance Engineer",
      company: "Tesla",
      companyLogo: "https://logo.clearbit.com/tesla.com",
      address: "Austin, TX, USA",
      coordinates: [30.2672, -97.7431],
      type: "Full-time",
      experience: "Mid Level",
      salary: "$85,000 - $115,000",
      description: "Ensure quality standards for electric vehicles and energy products.",
      applicants: 76,
      posted: "4 days ago",
      featured: false,
      urgent: false
    },
    {
      id: 23,
      title: "Solutions Architect",
      company: "Amazon",
      companyLogo: "https://logo.clearbit.com/amazon.com",
      address: "Sydney, NSW, Australia",
      coordinates: [-33.8688, 151.2093],
      type: "Full-time",
      experience: "Senior Level",
      salary: "AUD $140,000 - $180,000",
      description: "Design cloud architecture solutions for enterprise customers in APAC.",
      applicants: 143,
      posted: "2 days ago",
      featured: false,
      urgent: true
    },
    {
      id: 24,
      title: "Graphic Designer",
      company: "Adobe",
      companyLogo: "https://logo.clearbit.com/adobe.com",
      address: "San Jose, CA, USA",
      coordinates: [37.3382, -121.8863],
      type: "Full-time",
      experience: "Mid Level",
      salary: "$70,000 - $95,000",
      description: "Create visual designs for creative software used by millions of artists.",
      applicants: 189,
      posted: "5 days ago",
      featured: false,
      urgent: false
    },
    {
      id: 25,
      title: "DevOps Manager",
      company: "GitLab",
      companyLogo: "https://logo.clearbit.com/gitlab.com",
      address: "Remote",
      coordinates: [52.5200, 13.4050], // Default to Berlin
      type: "Remote",
      experience: "Senior Level",
      salary: "$120,000 - $160,000",
      description: "Lead DevOps initiatives and manage CI/CD infrastructure at scale.",
      applicants: 98,
      posted: "1 week ago",
      featured: true,
      urgent: false
    },
    {
      id: 26,
      title: "Research Engineer",
      company: "Baidu",
      companyLogo: "https://logo.clearbit.com/baidu.com",
      address: "Beijing, China",
      coordinates: [39.9042, 116.4074],
      type: "Full-time",
      experience: "Senior Level",
      salary: "¥500,000 - ¥800,000",
      description: "Research autonomous driving technology and AI applications.",
      applicants: 67,
      posted: "6 days ago",
      featured: false,
      urgent: true
    },
    {
      id: 27,
      title: "Sales Engineer",
      company: "Salesforce",
      companyLogo: "https://logo.clearbit.com/salesforce.com",
      address: "Chicago, IL, USA",
      coordinates: [41.8781, -87.6298],
      type: "Full-time",
      experience: "Mid Level",
      salary: "$90,000 - $130,000",
      description: "Drive technical sales and customer success for enterprise CRM solutions.",
      applicants: 112,
      posted: "2 days ago",
      featured: false,
      urgent: false
    },
    {
      id: 28,
      title: "Hardware Engineer",
      company: "Intel",
      companyLogo: "https://logo.clearbit.com/intel.com",
      address: "Santa Clara, CA, USA",
      coordinates: [37.3541, -121.9552],
      type: "Full-time",
      experience: "Senior Level",
      salary: "$130,000 - $170,000",
      description: "Design next-generation processors and semiconductor technologies.",
      applicants: 84,
      posted: "1 week ago",
      featured: true,
      urgent: false
    },
    {
      id: 29,
      title: "Technical Writer",
      company: "Stripe",
      companyLogo: "https://logo.clearbit.com/stripe.com",
      address: "Dublin, Ireland",
      coordinates: [53.3498, -6.2603],
      type: "Full-time",
      experience: "Mid Level",
      salary: "€50,000 - €70,000",
      description: "Create clear and comprehensive documentation for payment APIs.",
      applicants: 156,
      posted: "3 days ago",
      featured: false,
      urgent: false
    },
    {
      id: 30,
      title: "Site Reliability Engineer",
      company: "Airbnb",
      companyLogo: "https://logo.clearbit.com/airbnb.com",
      address: "Barcelona, Spain",
      coordinates: [41.3851, 2.1734],
      type: "Full-time",
      experience: "Senior Level",
      salary: "€70,000 - €95,000",
      description: "Ensure reliability and performance of global accommodation platform.",
      applicants: 134,
      posted: "4 days ago",
      featured: false,
      urgent: true
    }
  ];

  // State
  let searchQuery = "";
  let selectedType = "all";
  let selectedExperience = "all";
  let showAddJobModal = false;
  let selectedJob = null;
  let mapLoaded = false;
  let mapError = null;
  let markerRefs = {};

  // New job form
  let newJob = {
    title: "",
    company: "",
    companyLogo: "",
    address: "",
    type: "Full-time",
    experience: "Mid Level",
    salary: "",
    description: "",
    featured: false,
    urgent: false
  };

  // Filter options
  $: typeOptions = [
    { value: "all", label: $_("common.all") },
    { value: "Full-time", label: "Full-time" },
    { value: "Part-time", label: "Part-time" },
    { value: "Remote", label: "Remote" },
    { value: "Hybrid", label: "Hybrid" }
  ];

  $: experienceOptions = [
    { value: "all", label: $_("common.all") },
    { value: "Entry Level", label: "Entry Level" },
    { value: "Mid Level", label: "Mid Level" },
    { value: "Senior Level", label: "Senior Level" }
  ];

  // Filtered jobs (all jobs matching filters)
  $: allFilteredJobs = jobs.filter((job) => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || job.type === selectedType;
    const matchesExperience = selectedExperience === "all" || job.experience === selectedExperience;
    return matchesSearch && matchesType && matchesExperience;
  });

  // Calculate total pages
  $: totalPages = Math.ceil(allFilteredJobs.length / itemsPerPage);

  // Get current page jobs for list view
  $: paginatedJobs = allFilteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // For map view, show all filtered jobs
  $: filteredJobs = allFilteredJobs;

  // Reset to first page when filters change
  $: if (searchQuery || selectedType || selectedExperience) {
    currentPage = 1;
  }

  // Pagination functions
  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }

  function nextPage() {
    if (currentPage < totalPages) {
      currentPage++;
    }
  }

  function prevPage() {
    if (currentPage > 1) {
      currentPage--;
    }
  }

  // Load Leaflet CSS on component mount
  onMount(async () => {
    try {
      // Import Leaflet CSS
      const leafletCSS = document.createElement('link');
      leafletCSS.rel = 'stylesheet';
      leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      leafletCSS.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
      leafletCSS.crossOrigin = '';
      document.head.appendChild(leafletCSS);

      // Wait for CSS to load
      await new Promise(resolve => {
        leafletCSS.onload = resolve;
        setTimeout(resolve, 1000); // Fallback timeout
      });

      // Import Leaflet JS
      L = (await import('leaflet')).default;
      // Always initialize map
      initializeMapIfNeeded();
    } catch (error) {
      console.error('Error loading Leaflet:', error);
      mapError = 'Failed to load map library. Please refresh the page.';
    }
  });

  onDestroy(() => {
    cleanupMap();
  });

  function updateMapMarkers() {
    if (!map || !L) return;
    markerRefs = {};
    try {
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer);
        }
      });
      filteredJobs.forEach((job) => {
        if (job.coordinates && Array.isArray(job.coordinates) && job.coordinates.length === 2) {
          const marker = L.marker(job.coordinates).addTo(map);
          markerRefs[job.id] = marker;
          marker.bindPopup(`
            <div style="min-width: 200px; max-width: 300px;">
              <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                <img src="${job.companyLogo || 'https://via.placeholder.com/32'}" 
                     alt="${job.company}" 
                     style="width: 32px; height: 32px; border-radius: 8px; object-fit: cover;"
                     onerror="this.src='https://via.placeholder.com/32'">
                <div>
                  <h4 style="margin: 0; font-weight: bold; font-size: 14px;">${job.title}</h4>
                  <p style="margin: 0; color: #666; font-size: 12px;">${job.company}</p>
                </div>
              </div>
              <p style="margin: 4px 0; font-size: 12px;"><strong>📍 Location:</strong> ${job.address}</p>
              <p style="margin: 4px 0; font-size: 12px;"><strong>💼 Type:</strong> ${job.type}</p>
              <p style="margin: 4px 0; font-size: 12px;"><strong>💰 Salary:</strong> ${job.salary}</p>
              <p style="margin: 4px 0; font-size: 12px;"><strong>👥 Applicants:</strong> ${job.applicants}</p>
              <div style="margin: 8px 0;">
                ${job.featured ? '<span style="background: #f59e0b; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px;">⭐ Featured</span>' : ''}
                ${job.urgent ? '<span style="background: #ef4444; color: white; padding: 2px 6px; border-radius: 12px; font-size: 10px; margin-left: 4px;">🚨 Urgent</span>' : ''}
              </div>
              <button data-job-id="${job.id}" 
                      style="background: #3B82F6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 12px; cursor: pointer; margin-top: 8px; width: 100%;">
                ${$_('maps.see_job')}
              </button>
            </div>
          `);
        }
      });
      
      // Add delegated event handler for "See Job" buttons
      if (map) {
        map.on('popupopen', (e) => {
          const popup = e.popup;
          const popupElement = popup.getElement();
          const seeJobButton = popupElement.querySelector('[data-job-id]');
          if (seeJobButton) {
            seeJobButton.addEventListener('click', (event) => {
              const jobId = parseInt(event.target.getAttribute('data-job-id'));
              const job = filteredJobs.find(j => j.id === jobId);
              if (job) {
                selectedJob = job;
              }
            });
          }
        });
      }
      
      if (filteredJobs.length > 0) {
        const group = new L.featureGroup(Object.values(markerRefs));
        if (Object.keys(group._layers).length > 0) {
          map.fitBounds(group.getBounds().pad(0.1));
        }
      }
    } catch (error) {
      console.error('Error updating map markers:', error);
    }
  }

  function selectJob(job) {
    if (map && markerRefs[job.id]) {
      map.setView(job.coordinates, 10, { animate: true });
      markerRefs[job.id].openPopup();
    }
  }

  function openJobDetails(job) {
    selectedJob = job;
  }

  function closeJobDetails() {
    selectedJob = null;
  }

  function openAddJobModal() {
    showAddJobModal = true;
  }

  function closeAddJobModal() {
    showAddJobModal = false;
    newJob = {
      title: "",
      company: "",
      companyLogo: "",
      address: "",
      type: "Full-time",
      experience: "Mid Level",
      salary: "",
      description: "",
      featured: false,
      urgent: false
    };
  }

  function saveJob() {
    if (!newJob.title || !newJob.company || !newJob.address) {
      alert("Please fill in all required fields");
      return;
    }

    // Generate coordinates based on city mapping or random
    let coordinates = [40.7128, -74.0060]; // Default to NYC
    
    // Simple coordinate mapping for common cities
    const cityCoordinates = {
      "london": [51.5074, -0.1278],
      "paris": [48.8566, 2.3522],
      "berlin": [52.5200, 13.4050],
      "tokyo": [35.6762, 139.6503],
      "singapore": [1.3521, 103.8198],
      "sydney": [-33.8688, 151.2093],
      "toronto": [43.6532, -79.3832],
      "mumbai": [19.0760, 72.8777],
      "bangalore": [12.9716, 77.5946],
      "stockholm": [59.3293, 18.0686],
      "amsterdam": [52.3676, 4.9041],
      "zurich": [47.3769, 8.5417],
      "seoul": [37.5665, 126.9780],
      "bangkok": [13.7563, 100.5018],
      "dubai": [25.2048, 55.2708],
      "mexico city": [19.4326, -99.1332],
      "buenos aires": [-34.6118, -58.3960],
      "sao paulo": [-23.5558, -46.6396],
      "jakarta": [-6.2088, 106.8456],
      "shenzhen": [22.5431, 114.0579],
      "eindhoven": [51.4416, 5.4697]
    };

    // Check if address contains any known city
    const addressLower = newJob.address.toLowerCase();
    for (const [city, coords] of Object.entries(cityCoordinates)) {
      if (addressLower.includes(city)) {
        coordinates = coords;
        break;
      }
    }

    // If no match found and not NYC, generate random coordinates
    if (coordinates[0] === 40.7128 && coordinates[1] === -74.0060 && !addressLower.includes("new york")) {
      coordinates = [
        (Math.random() - 0.5) * 160, // Random latitude between -80 and 80
        (Math.random() - 0.5) * 360  // Random longitude between -180 and 180
      ];
    }

    const newJobData = {
      id: Date.now(),
      ...newJob,
      coordinates,
      applicants: Math.floor(Math.random() * 100),
      posted: "Just now",
      companyLogo: newJob.companyLogo || "https://via.placeholder.com/40x40/3B82F6/FFFFFF?text=" + newJob.company.charAt(0)
    };
    
    jobs = [...jobs, newJobData];
    closeAddJobModal();
    updateMapMarkers();
  }

  function deleteJob(jobId) {
    if (confirm("Are you sure you want to delete this job?")) {
      jobs = jobs.filter(j => j.id !== jobId);
      selectedJob = null;
      updateMapMarkers();
    }
  }

  // Function to clean up map
  function cleanupMap() {
    try {
      if (map && typeof map.remove === 'function') {
        map.remove();
      }
    } catch (error) {
      console.warn('Error removing map:', error);
    }
    map = null;
    
    if (mapContainer) {
      try {
        if (mapContainer._leaflet_map && typeof mapContainer._leaflet_map.remove === 'function') {
          mapContainer._leaflet_map.remove();
        }
      } catch (error) {
        console.warn('Error removing leaflet map from container:', error);
      }
      
      try {
        mapContainer.innerHTML = '';
      } catch (error) {
        console.warn('Error clearing container innerHTML:', error);
      }
      
      try { 
        delete mapContainer._leaflet_id; 
      } catch(e) { 
        mapContainer._leaflet_id = undefined; 
      }
      try { 
        delete mapContainer._leaflet_map; 
      } catch(e) { 
        mapContainer._leaflet_map = undefined; 
      }
    }
    mapLoaded = false;
    mapInitializing = false;
  }

  // Initialize map when switching to map view
  async function initializeMapIfNeeded() {
    // Don't initialize if already initializing
    if (mapInitializing) return;
    
    mapInitializing = true;
    try {
      mapError = null;
      mapLoaded = false;
      
      // Wait for DOM to be ready
      await tick();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      if (!mapContainer) {
        console.warn('Map container not found');
        mapInitializing = false;
        return;
      }
      
      // Only cleanup if there's an existing map instance
      if (mapContainer._leaflet_id || map) {
        try {
          if (map && typeof map.remove === 'function') {
            map.remove();
          }
          map = null;
          if (mapContainer._leaflet_map && typeof mapContainer._leaflet_map.remove === 'function') {
            mapContainer._leaflet_map.remove();
          }
          mapContainer.innerHTML = '';
          try { delete mapContainer._leaflet_id; } catch(e) { mapContainer._leaflet_id = undefined; }
          try { delete mapContainer._leaflet_map; } catch(e) { mapContainer._leaflet_map = undefined; }
        } catch (error) {
          console.warn('Error during map cleanup in initialize:', error);
        }
      }
      
      // Import Leaflet if not already imported
      if (!L) {
        L = (await import('leaflet')).default;
      }
      
      // Initialize map
      map = L.map(mapContainer, {
        preferCanvas: true,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        boxZoom: true,
        keyboard: true
      }).setView([39.8283, -98.5795], 4);
      
      mapContainer._leaflet_map = map;
      
      // Add tile layer
      const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        minZoom: 2
      });
      tileLayer.addTo(map);
      
      mapLoaded = true;
      mapInitializing = false;
      
      setTimeout(() => {
        updateMapMarkers();
        map.invalidateSize();
      }, 100);
      
      map.on('zoomend moveend', () => {
        map.invalidateSize();
      });
    } catch (error) {
      console.error('Error initializing map:', error);
      mapError = 'Failed to load map. Please refresh the page.';
      mapInitializing = false;
      mapLoaded = false;
    }
  }
</script>

<div class="space-y-8">
  <!-- Page header -->
  <div class="border-b border-base-300 pb-6" use:motionInView={{ animation: 'fadeInDown' }}>
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl lg:text-3xl font-bold text-base-content">{$_("maps.title")}</h1>
        <p class="mt-2 text-sm text-base-content/60">
          {$_("maps.description")}
        </p>
      </div>
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <button
          class="btn btn-primary shadow-lg hover:text-primary-content w-full sm:w-auto"
          on:click={openAddJobModal}
          use:motionHover
        >
          <Icon icon="heroicons:plus" class="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          {$_("maps.add_job")}
        </button>
      </div>
    </div>
  </div>

  <!-- Filters and Search -->
  <div class="card bg-base-100 shadow-sm border border-base-300" use:motionInView={{ animation: 'fadeInUp' }}>
    <div class="card-body">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <!-- Search -->
        <div class="lg:col-span-2">
          <label class="block text-sm font-medium text-base-content mb-2">
            {$_("maps.search_jobs")}
          </label>
          <div class="join w-full">
            <div class="join-item flex-1">
              <input
                type="text"
                bind:value={searchQuery}
                placeholder={$_("maps.search_placeholder")}
                class="input input-bordered w-full"
              />
            </div>
            <button class="btn join-item hover:text-base-content">
              <Icon icon="heroicons:magnifying-glass" class="w-4 h-4" />
            </button>
          </div>
        </div>
        <!-- Job Type Filter -->
        <div>
          <label class="block text-sm font-medium text-base-content mb-2">
            {$_("maps.job_type")}
          </label>
          <select bind:value={selectedType} class="select select-bordered w-full">
            {#each typeOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
        <!-- Experience Filter -->
        <div>
          <label class="block text-sm font-medium text-base-content mb-2">
            {$_("maps.experience_level")}
          </label>
          <select bind:value={selectedExperience} class="select select-bordered w-full">
            {#each experienceOptions as option}
              <option value={option.value}>{option.label}</option>
            {/each}
          </select>
        </div>
      </div>
      <!-- Results -->
      <div class="flex items-center justify-between mt-6 pt-6 border-t border-base-300">
        <div class="text-sm text-base-content/60">
          {allFilteredJobs.length} {$_("common.of")} {jobs.length} {$_("maps.jobs_found")}
        </div>
      </div>
    </div>
  </div>

  <!-- Main Content: Map and Job List Side by Side -->
  <div class="flex flex-col lg:flex-row gap-6 mt-8 max-w-full overflow-x-hidden">
    <!-- Map -->
    <div class="lg:w-3/5 w-full h-[500px] lg:h-[700px]">
      <div class="relative h-full w-full">
        {#if mapError}
          <div class="flex items-center justify-center h-full bg-base-200 rounded-lg">
            <div class="text-center">
              <Icon icon="heroicons:exclamation-triangle" class="w-16 h-16 text-error mx-auto mb-4" />
              <h3 class="text-lg font-semibold text-base-content mb-2">{$_("maps.map_error")}</h3>
              <p class="text-base-content/70 mb-4">{mapError}</p>
              <button class="btn btn-primary" on:click={() => window.location.reload()}>
                <Icon icon="heroicons:arrow-path" class="w-4 h-4 mr-2" />
                {$_("maps.reload_page")}
              </button>
            </div>
          </div>
        {:else}
          <div bind:this={mapContainer} class="h-full w-full rounded-lg map-container">
            {#if !mapLoaded || mapInitializing}
              <div class="absolute inset-0 flex items-center justify-center bg-base-200 rounded-lg z-10">
                <div class="text-center">
                  <div class="loading loading-spinner loading-lg text-primary mb-4"></div>
                  <p class="text-base-content/70">
                    {mapInitializing ? 'Initializing map...' : $_("maps.loading_map")}
                  </p>
                </div>
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </div>
    <!-- Job List -->
    <div class="lg:w-2/5 w-full max-h-[700px] overflow-y-auto overflow-x-hidden max-w-full space-y-4">
      {#each filteredJobs as job (job.id)}
        <div 
          class="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-shadow duration-200 cursor-pointer"
          on:click={() => selectJob(job)}
          use:motionHover
        >
          <div class="card-body">
            <div class="flex items-start gap-3 mb-4">
              <img 
                src={job.companyLogo} 
                alt={job.company}
                class="w-12 h-12 rounded-lg object-cover bg-base-200"
                on:error={() => {}}
              />
              <div class="flex-1 min-w-0">
                <h3 class="font-bold text-base-content">{job.title}</h3>
                <p class="text-sm text-base-content/70">{job.company}</p>
                <div class="flex items-center gap-2 mt-1">
                  {#if job.featured}
                    <span class="badge badge-warning badge-xs">Featured</span>
                  {/if}
                  {#if job.urgent}
                    <span class="badge badge-error badge-xs">Urgent</span>
                  {/if}
                </div>
              </div>
            </div>
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-sm text-base-content/70">
                <Icon icon="heroicons:map-pin" class="w-4 h-4" />
                <span>{job.address}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-base-content/70">
                <Icon icon="heroicons:briefcase" class="w-4 h-4" />
                <span>{job.type}</span>
              </div>
              <div class="flex items-center gap-2 text-sm text-success">
                <Icon icon="heroicons:banknotes" class="w-4 h-4" />
                <span>{job.salary}</span>
              </div>
            </div>
            <div class="card-actions justify-between mt-4 pt-4 border-t border-base-300">
              <div class="flex items-center gap-4 text-xs text-base-content/50">
                <span>{job.posted}</span>
                <span>{job.applicants} applicants</span>
              </div>
              <button 
                class="btn btn-primary btn-sm"
                on:click|stopPropagation={() => openJobDetails(job)}
              >
                <Icon icon="heroicons:eye" class="w-4 h-4 mr-1" />
                {$_("maps.see_job")}
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
  <!-- Add Job Modal -->
  {#if showAddJobModal}
    <div class="modal modal-open">
      <div class="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto" use:motionInView={{ animation: 'scaleIn' }}>
        <!-- Modal Header -->
        <div class="border-b border-base-300 pb-4 mb-6">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-2xl font-bold text-base-content">{$_("maps.add_new_job")}</h3>
              <p class="text-sm text-base-content/60 mt-1">Fill in the details to post a new job opportunity</p>
            </div>
            <button class="btn btn-sm btn-circle btn-ghost" on:click={closeAddJobModal}>✕</button>
          </div>
        </div>

        <!-- Form Content -->
        <div class="space-y-6">
          <!-- Basic Information Section -->
          <div class="card bg-base-100 border border-base-300">
            <div class="card-body">
              <h4 class="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
                <Icon icon="heroicons:briefcase" class="w-5 h-5 text-primary" />
                Basic Information
              </h4>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">{$_("maps.job_title")} *</span>
                    <span class="label-text-alt text-error">Required</span>
                  </label>
                  <input 
                    type="text" 
                    bind:value={newJob.title}
                    placeholder="e.g. Senior Frontend Developer"
                    class="input input-bordered focus:input-primary" 
                  />
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">{$_("maps.company")} *</span>
                    <span class="label-text-alt text-error">Required</span>
                  </label>
                  <input 
                    type="text" 
                    bind:value={newJob.company}
                    placeholder="e.g. Tech Corp"
                    class="input input-bordered focus:input-primary" 
                  />
                </div>

                <div class="form-control lg:col-span-2">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">{$_("maps.company_logo_url")}</span>
                    <span class="label-text-alt text-base-content/50">Optional</span>
                  </label>
                  <div class="join w-full">
                    <input 
                      type="url" 
                      bind:value={newJob.companyLogo}
                      placeholder="https://logo.clearbit.com/company.com"
                      class="input input-bordered join-item flex-1 focus:input-primary" 
                    />
                    {#if newJob.companyLogo}
                      <div class="join-item flex items-center px-3 bg-base-200 border border-base-300">
                        <img 
                          src={newJob.companyLogo} 
                          alt="Logo preview" 
                          class="w-6 h-6 rounded object-cover"
                          on:error={() => {}}
                        />
                      </div>
                    {/if}
                  </div>
                </div>

                <div class="form-control lg:col-span-2">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">{$_("maps.address")} *</span>
                    <span class="label-text-alt text-error">Required</span>
                  </label>
                  <input 
                    type="text" 
                    bind:value={newJob.address}
                    placeholder="e.g. New York, NY, USA"
                    class="input input-bordered focus:input-primary" 
                  />
                  <label class="label">
                    <span class="label-text-alt text-base-content/50">
                      <Icon icon="heroicons:information-circle" class="w-3 h-3 inline mr-1" />
                      Include city, state/province, and country for better map placement
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Job Details Section -->
          <div class="card bg-base-100 border border-base-300">
            <div class="card-body">
              <h4 class="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
                <Icon icon="heroicons:cog-6-tooth" class="w-5 h-5 text-primary" />
                Job Details
              </h4>
              
              <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">{$_("maps.job_type")}</span>
                  </label>
                  <select bind:value={newJob.type} class="select select-bordered focus:select-primary">
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">{$_("maps.experience")}</span>
                  </label>
                  <select bind:value={newJob.experience} class="select select-bordered focus:select-primary">
                    <option value="Entry Level">Entry Level (0-2 years)</option>
                    <option value="Mid Level">Mid Level (2-5 years)</option>
                    <option value="Senior Level">Senior Level (5+ years)</option>
                    <option value="Lead">Lead/Principal (8+ years)</option>
                  </select>
                </div>

                <div class="form-control">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">{$_("maps.salary_range")}</span>
                  </label>
                  <input 
                    type="text" 
                    bind:value={newJob.salary}
                    placeholder="e.g. $80,000 - $120,000"
                    class="input input-bordered focus:input-primary" 
                  />
                </div>

                <div class="form-control lg:col-span-3">
                  <label class="label">
                    <span class="label-text font-medium text-base-content">{$_("maps.job_description")}</span>
                  </label>
                  <textarea 
                    bind:value={newJob.description}
                    placeholder="Describe the role, responsibilities, requirements, and what makes this opportunity exciting..."
                    class="textarea textarea-bordered h-32 focus:textarea-primary"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <!-- Job Highlights Section -->
          <div class="card bg-base-100 border border-base-300">
            <div class="card-body">
              <h4 class="text-lg font-semibold text-base-content mb-4 flex items-center gap-2">
                <Icon icon="heroicons:star" class="w-5 h-5 text-primary" />
                Job Highlights
              </h4>
              
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" bind:checked={newJob.featured} class="checkbox checkbox-primary" />
                    <div>
                      <span class="label-text font-medium text-base-content flex items-center gap-2">
                        <Icon icon="heroicons:star-solid" class="w-4 h-4 text-warning" />
                        {$_("maps.featured")}
                      </span>
                      <p class="text-xs text-base-content/60">Highlight this job to attract more candidates</p>
                    </div>
                  </label>
                </div>

                <div class="form-control">
                  <label class="label cursor-pointer justify-start gap-3">
                    <input type="checkbox" bind:checked={newJob.urgent} class="checkbox checkbox-error" />
                    <div>
                      <span class="label-text font-medium text-base-content flex items-center gap-2">
                        <Icon icon="heroicons:exclamation-triangle-solid" class="w-4 h-4 text-error" />
                        {$_("maps.urgent")}
                      </span>
                      <p class="text-xs text-base-content/60">Mark as urgent hiring priority</p>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="border-t border-base-300 pt-6 mt-8">
          <div class="flex justify-between items-center">
            <div class="text-sm text-base-content/60">
              <Icon icon="heroicons:information-circle" class="w-4 h-4 inline mr-1" />
              Fields marked with * are required
            </div>
            <div class="flex gap-3">
              <button class="btn btn-ghost" on:click={closeAddJobModal}>
                <Icon icon="heroicons:x-mark" class="w-4 h-4 mr-2" />
                {$_("maps.cancel")}
              </button>
              <button class="btn btn-primary" on:click={saveJob}>
                <Icon icon="heroicons:plus" class="w-4 h-4 mr-2" />
                Post Job
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!-- Job Details Modal -->
  {#if selectedJob}
    <div class="modal modal-open">
      <div class="modal-box w-11/12 max-w-2xl" use:motionInView={{ animation: 'scaleIn' }}>
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={closeJobDetails}>✕</button>
        
        <div class="space-y-6">
          <!-- Company Header -->
          <div class="flex items-start gap-4">
            <img 
              src={selectedJob.companyLogo} 
              alt={selectedJob.company}
              class="w-16 h-16 rounded-xl object-cover bg-base-200"
              on:error={() => {}}
            />
            <div class="flex-1">
              <h2 class="text-xl font-bold">{selectedJob.title}</h2>
              <p class="text-lg text-base-content/70">{selectedJob.company}</p>
              <div class="flex items-center gap-2 mt-2">
                {#if selectedJob.featured}
                  <span class="badge badge-warning">Featured</span>
                {/if}
                {#if selectedJob.urgent}
                  <span class="badge badge-error">Urgent</span>
                {/if}
                <span class="badge badge-outline">{selectedJob.type}</span>
              </div>
            </div>
          </div>

          <!-- Key Info -->
          <div class="grid grid-cols-2 gap-4">
            <div class="stat bg-base-200 rounded-lg">
              <div class="stat-title text-xs">{$_("maps.salary")}</div>
              <div class="stat-value text-lg text-success">{selectedJob.salary}</div>
            </div>
            <div class="stat bg-base-200 rounded-lg">
              <div class="stat-title text-xs">{$_("maps.applicants")}</div>
              <div class="stat-value text-lg">{selectedJob.applicants}</div>
            </div>
            <div class="stat bg-base-200 rounded-lg">
              <div class="stat-title text-xs">{$_("maps.experience")}</div>
              <div class="stat-value text-sm">{selectedJob.experience}</div>
            </div>
            <div class="stat bg-base-200 rounded-lg">
              <div class="stat-title text-xs">{$_("maps.posted")}</div>
              <div class="stat-value text-sm">{selectedJob.posted}</div>
            </div>
          </div>

          <!-- Location -->
          <div>
            <h4 class="font-semibold mb-2 flex items-center gap-2">
              <Icon icon="heroicons:map-pin" class="w-4 h-4" />
              {$_("maps.location")}
            </h4>
            <p class="text-base-content/70">{selectedJob.address}</p>
          </div>

          <!-- Description -->
          {#if selectedJob.description}
            <div>
              <h4 class="font-semibold mb-2">{$_("maps.description")}</h4>
              <p class="text-base-content/70">{selectedJob.description}</p>
            </div>
          {/if}

          <!-- Actions -->
          <div class="flex justify-between">
            <button class="btn btn-error btn-outline" on:click={() => deleteJob(selectedJob.id)}>
              <Icon icon="heroicons:trash" class="w-4 h-4 mr-2" />
              {$_("maps.delete_job")}
            </button>
            <button class="btn btn-primary">
              <Icon icon="heroicons:paper-airplane" class="w-4 h-4 mr-2" />
              {$_("maps.apply_now")}
            </button>
          </div>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>
  /* Map container styling */
  .map-container {
    min-height: 600px;
    background: #f3f4f6;
    position: relative;
  }

  /* Leaflet specific styling */
  :global(.leaflet-container) {
    height: 100% !important;
    width: 100% !important;
    border-radius: 0.5rem;
    background: #f3f4f6;
    font-family: inherit;
  }
  
  :global(.leaflet-popup-content-wrapper) {
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e7eb;
  }

  :global(.leaflet-popup-content) {
    margin: 12px 16px;
    line-height: 1.5;
  }

  :global(.leaflet-popup-tip) {
    border-top-color: #ffffff;
  }

  :global(.leaflet-control-zoom) {
    border: none;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  :global(.leaflet-control-zoom a) {
    border-radius: 8px;
    border: none;
    background: white;
    color: #374151;
    font-weight: bold;
    transition: all 0.2s ease;
  }

  :global(.leaflet-control-zoom a:hover) {
    background: #f3f4f6;
    color: #111827;
  }

  :global(.leaflet-control-attribution) {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    border: 1px solid #e5e7eb;
    margin: 8px;
  }

  /* Custom marker styling */
  :global(.leaflet-marker-icon) {
    filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  }

  /* Loading state */
  .map-container:before {
    content: "Loading map...";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #6b7280;
    font-size: 14px;
    z-index: 100;
  }

  :global(.leaflet-container:not(.leaflet-zoom-anim)) ~ .map-container:before {
    display: none;
  }
</style> 