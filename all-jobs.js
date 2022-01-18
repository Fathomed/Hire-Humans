// On document ready, let's fetch some data
// Create a variable for the API endpoint. In this example, we're accessing Xano's API
const xanoUrl = new URL("https://x8ki-letl-twmt.n7.xano.io/api:Jl_Joaf7/");

// Define a function (set of operations) to get restaurant information.
// This will use the GET request on the URL endpoint
function getJobs() {
  // Create a request variable and assign a new XMLHttpRequest object to it.
  // XMLHttpRequest is the standard way you access an API in plain Javascript.
  const request = new XMLHttpRequest();

  // Define a function (set of operations) to get restaurant information.
  // Creates a variable that will take the URL from above and makes sure it displays as a string.
  // We then add the word 'restaurant" so the API endpoint becomes https://x715-fe9c-6426.n7.xano.io/api:Iw1iInWB/restaurant
  const url = `${xanoUrl.toString()}jobs`;

  // Remember the 'request' was defined above as the standard way to access an API in Javascript.
  // GET is the verb we're using to GET data from Xano test
  request.open("GET", url, true);

  // When the 'request' or API request loads, do the following...
  request.onload = function () {
    // Store what we get back from the Xano API as a variable called 'data' and converts it to a javascript object
    const data = JSON.parse(this.response);

    // Status 200 = Success. Status 400 = Problem.  This says if it's successful and no problems, then execute
    if (request.status >= 200 && request.status < 400) {
      // Map a variable called cardContainer to the Webflow element called "Cards-Container"
      const postlist = document.getElementById("jobs-container");

      // This is called a For Loop. This goes through each object being passed back from the Xano API and does something.
      // Specifically, it says "For every element in Data (response from API), call each individual item restaurant"
      data.forEach((record) => {
        const jobpost = document.createElement("a");
        jobpost.setAttribute("class", "job-item_new");
        jobpost.setAttribute(
          "style",
          `background-color:${record.role_subcategory[0].category_colour_25}`
        );
        jobpost.addEventListener("click", function () {
          document.location.href = `/job-post?id=${record.id}`;
        });
        postlist.appendChild(jobpost);

        const topwrapper = document.createElement("div");
        topwrapper.setAttribute("class", "top-wrapper");
        jobpost.appendChild(topwrapper);

        const postpill = document.createElement("div");
        postpill.setAttribute("class", "pill__job w-clearfix");
        postpill.setAttribute(
          "style",
          `background-color:${record.role_subcategory[0].category_colour_50}`
        );
        topwrapper.appendChild(postpill);

        const categoryicon = document.createElement("img");
        categoryicon.setAttribute("class", "image-icon_small");
        categoryicon.setAttribute("src", record.role_subcategory[0].icon_url);
        categoryicon.setAttribute(
          "alt",
          record.role_subcategory[0].Role_type_name
        );
        categoryicon.setAttribute("loading", "lazy");
        postpill.appendChild(categoryicon);

        const categorytext = document.createElement("div");
        categorytext.setAttribute("class", "text-block");
        categorytext.textContent =
          record.role_subcategory[0].role_type_category;
        postpill.appendChild(categorytext);

        const postheading = document.createElement("h3");
        postheading.setAttribute("class", "heading-4");
        postheading.textContent = record.name;
        topwrapper.appendChild(postheading);

        const keywords = document.createElement("div");
        keywords.setAttribute("class", "key-words");
        keywords.textContent = record.keywords_to_assist_search;
        topwrapper.appendChild(keywords);

        const shortdesript = document.createElement("div");
        shortdesript.setAttribute("class", "short-descript text-style-3lines");
        shortdesript.textContent = record.short_description;
        topwrapper.appendChild(shortdesript);

        const bottomwrapper = document.createElement("div");
        bottomwrapper.setAttribute("class", "bottom-wrapper");
        jobpost.appendChild(bottomwrapper);

        const metatagwrapper = document.createElement("div");
        metatagwrapper.setAttribute("class", "meta-tags");
        bottomwrapper.appendChild(metatagwrapper);

        const locationwrapper = document.createElement("div");
        locationwrapper.setAttribute("class", "small-detail-wrapper");
        metatagwrapper.appendChild(locationwrapper);

        const locationicon = document.createElement("img");
        locationicon.setAttribute("class", "image-icon_small");
        locationicon.setAttribute(
          "src",
          "https://assets.website-files.com/601ee75a2efa042fc04f8a18/601ee75a2efa042dd94f8ae1_Location%20pin-bold.svg"
        );
        locationicon.setAttribute("alt", "location");
        locationicon.setAttribute("loading", "lazy");
        locationwrapper.appendChild(locationicon);

        const locationtext = document.createElement("div");
        locationtext.setAttribute("class", "detail-subtext");
        locationtext.textContent = record.sub_region[0].Locations;
        locationwrapper.appendChild(locationtext);

        const employmentwrapper = document.createElement("div");
        employmentwrapper.setAttribute("class", "small-detail-wrapper");
        metatagwrapper.appendChild(employmentwrapper);

        const employmenticon = document.createElement("img");
        employmenticon.setAttribute("class", "image-icon_small");
        employmenticon.setAttribute(
          "src",
          "https://assets.website-files.com/601ee75a2efa042fc04f8a18/601ee75a2efa04a0c54f8adc_Clock.svg"
        );
        employmenticon.setAttribute("alt", "preferred employment option");
        employmenticon.setAttribute("loading", "lazy");
        employmentwrapper.appendChild(employmenticon);

        const employmenttext = document.createElement("div");
        employmenttext.setAttribute("class", "detail-subtext");
        employmenttext.textContent = record.Preferred_Employment_Status;
        employmentwrapper.appendChild(employmenttext);

        const companydatewrapper = document.createElement("div");
        companydatewrapper.setAttribute("class", "company-date-wrapper");
        bottomwrapper.appendChild(companydatewrapper);

        const companyname = document.createElement("div");
        companyname.setAttribute("class", "company");
        companyname.textContent = record.Employer_name;
        companydatewrapper.appendChild(companyname);

        const postdate = document.createElement("div");
        postdate.setAttribute("class", "time");
        postdate.textContent = record.Date_Approved;
        companydatewrapper.appendChild(postdate);
      });
    }
  };

  // Send Restaurant request to API
  request.send();
}

// This fires all of the defined functions when the document is "ready" or loaded
(function () {
  getJobs();
})();
