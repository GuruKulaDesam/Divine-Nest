import { c as store_get, d as attr, a as ensure_array_like, u as unsubscribe_stores } from "./index2.js";
import { o as onDestroy, I as Icon } from "./Icon.js";
import { a as $format } from "./runtime.js";
import { e as escape_html } from "./context.js";
function MapsPage($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    var $$store_subs;
    let typeOptions, experienceOptions, allFilteredJobs, filteredJobs;
    let map;
    let mapInitializing = false;
    let currentPage = 1;
    let itemsPerPage = 6;
    let jobs = [
      {
        id: 1,
        title: "Senior Frontend Developer",
        company: "Meta",
        companyLogo: "https://logo.clearbit.com/meta.com",
        address: "New York, NY, USA",
        coordinates: [40.7128, -74.006],
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
        coordinates: [52.52, 13.405],
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
        coordinates: [19.076, 72.8777],
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
        coordinates: [37.323, -122.0322],
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
        coordinates: [52.52, 13.405],
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
    let searchQuery = "";
    let selectedType = "all";
    let selectedExperience = "all";
    let mapLoaded = false;
    onDestroy(() => {
      cleanupMap();
    });
    function cleanupMap() {
      try {
        if (map && typeof map.remove === "function") {
          map.remove();
        }
      } catch (error) {
        console.warn("Error removing map:", error);
      }
      map = null;
      mapLoaded = false;
      mapInitializing = false;
    }
    typeOptions = [
      {
        value: "all",
        label: store_get($$store_subs ??= {}, "$_", $format)("common.all")
      },
      { value: "Full-time", label: "Full-time" },
      { value: "Part-time", label: "Part-time" },
      { value: "Remote", label: "Remote" },
      { value: "Hybrid", label: "Hybrid" }
    ];
    experienceOptions = [
      {
        value: "all",
        label: store_get($$store_subs ??= {}, "$_", $format)("common.all")
      },
      { value: "Entry Level", label: "Entry Level" },
      { value: "Mid Level", label: "Mid Level" },
      { value: "Senior Level", label: "Senior Level" }
    ];
    allFilteredJobs = jobs.filter((job) => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || job.company.toLowerCase().includes(searchQuery.toLowerCase()) || job.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === "all";
      const matchesExperience = selectedExperience === "all";
      return matchesSearch && matchesType && matchesExperience;
    });
    Math.ceil(allFilteredJobs.length / itemsPerPage);
    {
      currentPage = 1;
    }
    allFilteredJobs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    filteredJobs = allFilteredJobs;
    $$renderer2.push(`<div class="space-y-8"><div class="relative overflow-hidden bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-6 border border-base-300/50"><div class="absolute top-0 right-0 w-16 h-16 opacity-10">`);
    Icon($$renderer2, { icon: "heroicons:map", class: "w-full h-full text-primary" });
    $$renderer2.push(`<!----></div> <div class="absolute bottom-0 left-0 w-24 h-24 opacity-10">`);
    Icon($$renderer2, {
      icon: "heroicons:location-marker",
      class: "w-full h-full text-secondary"
    });
    $$renderer2.push(`<!----></div> <div class="relative flex items-center justify-between"><div><h1 class="text-3xl font-bold text-primary">${escape_html(
      // Pagination functions
      // Load Leaflet CSS on component mount
      // Import Leaflet CSS
      // Wait for CSS to load
      // Fallback timeout
      // Import Leaflet JS
      // Always initialize map
      // Add delegated event handler for "See Job" buttons
      // Generate coordinates based on city mapping or random
      // Default to NYC
      // Simple coordinate mapping for common cities
      // Check if address contains any known city
      // If no match found and not NYC, generate random coordinates
      // Random latitude between -80 and 80
      // Random longitude between -180 and 180
      // Function to clean up map
      // Initialize map when switching to map view
      // Don't initialize if already initializing
      // Wait for DOM to be ready
      // Only cleanup if there's an existing map instance
      // Import Leaflet if not already imported
      // Initialize map
      // Add tile layer
      store_get($$store_subs ??= {}, "$_", $format)("maps.title")
    )}</h1> <p class="mt-2 text-sm text-base-content/70 max-w-md">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("maps.description"))}</p></div> <button class="btn btn-primary shadow-md hover:shadow-lg group relative overflow-hidden"><div class="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> <div class="relative flex items-center"><div class="p-1.5 rounded-lg bg-primary-content/20 group-hover:bg-primary-content/30 transition-colors duration-300">`);
    Icon($$renderer2, { icon: "heroicons:plus", class: "w-5 h-5 mr-2" });
    $$renderer2.push(`<!----></div> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("maps.add_job"))}</div></button></div></div> <div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg transition-shadow duration-200"><div class="card-body p-4"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"><div class="lg:col-span-2"><label class="block text-sm font-medium text-base-content mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("maps.search_jobs"))}</label> <div class="join w-full"><div class="join-item flex-1"><input type="text"${attr("value", searchQuery)}${attr("placeholder", store_get($$store_subs ??= {}, "$_", $format)("maps.search_placeholder"))} class="input input-bordered w-full focus:input-primary"/></div> <button class="btn join-item hover:text-base-content hover:bg-primary/10 transition-colors duration-200">`);
    Icon($$renderer2, { icon: "heroicons:magnifying-glass", class: "w-4 h-4" });
    $$renderer2.push(`<!----></button></div></div> <div><label class="block text-sm font-medium text-base-content mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("maps.job_type"))}</label> `);
    $$renderer2.select(
      {
        value: selectedType,
        class: "select select-bordered w-full focus:select-primary"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array = ensure_array_like(typeOptions);
        for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
          let option = each_array[$$index];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div> <div><label class="block text-sm font-medium text-base-content mb-2">${escape_html(store_get($$store_subs ??= {}, "$_", $format)("maps.experience_level"))}</label> `);
    $$renderer2.select(
      {
        value: selectedExperience,
        class: "select select-bordered w-full focus:select-primary"
      },
      ($$renderer3) => {
        $$renderer3.push(`<!--[-->`);
        const each_array_1 = ensure_array_like(experienceOptions);
        for (let $$index_1 = 0, $$length = each_array_1.length; $$index_1 < $$length; $$index_1++) {
          let option = each_array_1[$$index_1];
          $$renderer3.option({ value: option.value }, ($$renderer4) => {
            $$renderer4.push(`${escape_html(option.label)}`);
          });
        }
        $$renderer3.push(`<!--]-->`);
      }
    );
    $$renderer2.push(`</div></div> <div class="flex items-center justify-between mt-4 pt-4 border-t border-base-300"><div class="text-sm text-base-content/60">${escape_html(allFilteredJobs.length)} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("common.of"))} ${escape_html(jobs.length)} ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("maps.jobs_found"))}</div></div></div></div> <div class="flex flex-col lg:flex-row gap-6 mt-8 max-w-full overflow-x-hidden"><div class="lg:w-3/5 w-full h-[500px] lg:h-[700px]"><div class="relative h-full w-full">`);
    {
      $$renderer2.push("<!--[!-->");
      $$renderer2.push(`<div class="h-full w-full rounded-lg map-container shadow-md svelte-1cih056">`);
      if (!mapLoaded || mapInitializing) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<div class="absolute inset-0 flex items-center justify-center bg-base-200 rounded-lg z-10"><div class="text-center"><div class="loading loading-spinner loading-lg text-primary mb-4"></div> <p class="text-base-content/70">${escape_html(mapInitializing ? "Initializing map..." : store_get($$store_subs ??= {}, "$_", $format)("maps.loading_map"))}</p></div></div>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> <div class="lg:w-2/5 w-full max-h-[700px] overflow-y-auto overflow-x-hidden max-w-full space-y-4"><!--[-->`);
    const each_array_2 = ensure_array_like(filteredJobs);
    for (let $$index_2 = 0, $$length = each_array_2.length; $$index_2 < $$length; $$index_2++) {
      let job = each_array_2[$$index_2];
      $$renderer2.push(`<div class="card bg-base-100 shadow-md border border-base-300 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"><div class="card-body p-4"><div class="flex items-start gap-3 mb-4"><img${attr("src", job.companyLogo)}${attr("alt", job.company)} class="w-12 h-12 rounded-lg object-cover bg-base-200 shadow-sm"/> <div class="flex-1 min-w-0"><h3 class="font-bold text-base-content">${escape_html(job.title)}</h3> <p class="text-sm text-base-content/70">${escape_html(job.company)}</p> <div class="flex items-center gap-2 mt-1">`);
      if (job.featured) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="badge badge-warning badge-xs shadow-sm">Featured</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--> `);
      if (job.urgent) {
        $$renderer2.push("<!--[-->");
        $$renderer2.push(`<span class="badge badge-error badge-xs shadow-sm">Urgent</span>`);
      } else {
        $$renderer2.push("<!--[!-->");
      }
      $$renderer2.push(`<!--]--></div></div></div> <div class="space-y-2"><div class="flex items-center gap-2 text-sm text-base-content/70"><div class="w-6 h-6 bg-blue-500/10 rounded-lg flex items-center justify-center">`);
      Icon($$renderer2, { icon: "heroicons:map-pin", class: "w-3 h-3 text-blue-500" });
      $$renderer2.push(`<!----></div> <span>${escape_html(job.address)}</span></div> <div class="flex items-center gap-2 text-sm text-base-content/70"><div class="w-6 h-6 bg-green-500/10 rounded-lg flex items-center justify-center">`);
      Icon($$renderer2, { icon: "heroicons:briefcase", class: "w-3 h-3 text-green-500" });
      $$renderer2.push(`<!----></div> <span>${escape_html(job.type)}</span></div> <div class="flex items-center gap-2 text-sm text-success"><div class="w-6 h-6 bg-success/10 rounded-lg flex items-center justify-center">`);
      Icon($$renderer2, { icon: "heroicons:banknotes", class: "w-3 h-3 text-success" });
      $$renderer2.push(`<!----></div> <span>${escape_html(job.salary)}</span></div></div> <div class="card-actions justify-between mt-4 pt-4 border-t border-base-300"><div class="flex items-center gap-4 text-xs text-base-content/50"><span>${escape_html(job.posted)}</span> <span>${escape_html(job.applicants)} applicants</span></div> <button class="btn btn-primary btn-sm hover:shadow-md transition-shadow duration-200">`);
      Icon($$renderer2, { icon: "heroicons:eye", class: "w-4 h-4 mr-1" });
      $$renderer2.push(`<!----> ${escape_html(store_get($$store_subs ??= {}, "$_", $format)("maps.see_job"))}</button></div></div></div>`);
    }
    $$renderer2.push(`<!--]--></div></div> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--> `);
    {
      $$renderer2.push("<!--[!-->");
    }
    $$renderer2.push(`<!--]--></div>`);
    if ($$store_subs) unsubscribe_stores($$store_subs);
  });
}
export {
  MapsPage as default
};
