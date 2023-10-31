let applicants = [];
let currentApplicantIndex = 0;
let filteredApplicants = [];

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    if (data && data.resume) {
      applicants = data.resume;
      filteredApplicants = [...applicants];
      displayApplicant();
      checkNavigationButtons();
    }
  })
  .catch((error) => console.error("Error fetching data:", error));

const resumeContent = document.getElementById("resume-content");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const searchInput = document.getElementById("job-search");
const searchButton = document.getElementById("search-button");
const errorMessage = document.getElementById("error-message");

function displayApplicant() {
  const applicant = filteredApplicants[currentApplicantIndex];
  resumeContent.innerHTML = '';

  if (applicant) {
    const resumeContainer = document.createElement('div');
    resumeContainer.className = 'resume-container';
    
    const headerSection = document.createElement('div');
    headerSection.className = 'header';
    
    const nameHeader = document.createElement('h1');
    nameHeader.textContent = applicant.basics.name;
    headerSection.appendChild(nameHeader);
    
    const lineBreak = document.createElement('br');
    headerSection.appendChild(lineBreak);
    
    const jobTitle = document.createElement('p');
    jobTitle.className = 'job-title';
    jobTitle.textContent = `Applied For: ${applicant.basics.AppliedFor}`;
    headerSection.appendChild(jobTitle);
    
    const profileImage = document.createElement('img');
    profileImage.src = applicant.basics.image;
    profileImage.className = 'profile-image';
    headerSection.appendChild(profileImage);
    
    resumeContainer.appendChild(headerSection);
    

    const personalInfoRow = document.createElement('div');
    personalInfoRow.className = 'row';

    const leftColumn = document.createElement('div');
    leftColumn.className = 'left-column';

    const personalInfoHeading = document.createElement('h2');
    personalInfoHeading.textContent = 'Personal Information';
    leftColumn.appendChild(personalInfoHeading);

    const phoneInfo = document.createElement('h6');
    phoneInfo.textContent = `${applicant.basics.phone}`;
    leftColumn.appendChild(phoneInfo);

    const emailInfo = document.createElement('h6');
    emailInfo.textContent = `${applicant.basics.email}`;
    leftColumn.appendChild(emailInfo);

    const profileInfo = document.createElement('a');
    profileInfo.textContent = `${applicant.basics.profiles.url}`;
    leftColumn.appendChild(profileInfo);

    const skillsHeading = document.createElement('h2');
    skillsHeading.textContent = 'Technical Skills';
    leftColumn.appendChild(skillsHeading);

    const skillsList = document.createElement('ul');
    applicant.skills.keywords.forEach((skill) => {
      const skillItem = document.createElement('li');
      skillItem.textContent = skill;
      skillsList.appendChild(skillItem);
    });
    leftColumn.appendChild(skillsList);

    const hobbiesHeading = document.createElement('h2');
    hobbiesHeading.textContent = 'Hobbies';
    leftColumn.appendChild(hobbiesHeading);

    const hobbiesList = document.createElement('ul');
    applicant.interests.hobbies.forEach((hobby) => {
      const hobbyItem = document.createElement('li');
      hobbyItem.textContent = hobby;
      hobbiesList.appendChild(hobbyItem);
    });
    leftColumn.appendChild(hobbiesList);

    const rightColumn = document.createElement('div');
    rightColumn.className = 'right-column';

    const workExpHeading = document.createElement('h3');
    workExpHeading.textContent = 'Work Experience';
    rightColumn.appendChild(workExpHeading);

    const workExpItem = document.createElement('p');
    workExpItem.innerHTML = `<strong>${applicant.work["Company Name"]} - ${applicant.work.Position}</strong><br>
                              Start Date: ${applicant.work["Start Date"]}<br>
                              End Date: ${applicant.work["End Date"]}<br>
                              Summary: ${applicant.work.Summary}`;
    rightColumn.appendChild(workExpItem);

    const projectsHeading = document.createElement('h3');
    projectsHeading.textContent = 'Projects';
    rightColumn.appendChild(projectsHeading);

    const projectItem = document.createElement('p');
    projectItem.innerHTML = `<strong>${applicant.projects.name}</strong><br>${applicant.projects.description}`;
    rightColumn.appendChild(projectItem);

    const educationHeading = document.createElement('h3');
    educationHeading.textContent = 'Education';
    rightColumn.appendChild(educationHeading);

    const ugItem = document.createElement('p');
    ugItem.innerHTML = `<strong>${applicant.education.UG.institute}</strong><br>
                          Course: ${applicant.education.UG.course}<br>
                          Start Date: ${applicant.education.UG["Start Date"]}<br>
                          End Date: ${applicant.education.UG["End Date"]}<br>
                          CGPA: ${applicant.education.UG.cgpa}`;
    rightColumn.appendChild(ugItem);

    const seniorSecondaryItem = document.createElement('p');
    seniorSecondaryItem.innerHTML = `<strong>${applicant.education["Senior Secondary"].institute}</strong><br>
                                      CGPA: ${applicant.education["Senior Secondary"].cgpa}`;
    rightColumn.appendChild(seniorSecondaryItem);

    const achievementsHeading = document.createElement('h3');
    achievementsHeading.textContent = 'Achievements';
    rightColumn.appendChild(achievementsHeading);

    const achievementsList = document.createElement('ul');
    applicant.achievements.Summary.forEach((achievement) => {
      const achievementItem = document.createElement('p');
      achievementItem.textContent = achievement;
      achievementsList.appendChild(achievementItem);
    });
    rightColumn.appendChild(achievementsList);

    personalInfoRow.appendChild(leftColumn);
    personalInfoRow.appendChild(rightColumn);
    resumeContainer.appendChild(personalInfoRow);

    resumeContent.appendChild(resumeContainer);
  }
}



function checkNavigationButtons() {
  if (filteredApplicants.length <= 1) {
    prevButton.style.display = "none";
    nextButton.style.display = "none";
  } else if (currentApplicantIndex === 0) {
    prevButton.style.display = "none";
    nextButton.style.display = "inline";
  } else if (currentApplicantIndex === filteredApplicants.length - 1) {
    prevButton.style.display = "inline";
    nextButton.style.display = "none";
  } else {
    prevButton.style.display = "inline";
    nextButton.style.display = "inline";
  }
}

function filterApplicants(job) {
  return applicants.filter((applicant) => applicant.basics.AppliedFor === job);
}

prevButton.addEventListener("click", () => {
  if (currentApplicantIndex > 0) {
    currentApplicantIndex--;
    displayApplicant();
    checkNavigationButtons();
  }
});

nextButton.addEventListener("click", () => {
  if (currentApplicantIndex < filteredApplicants.length - 1) {
    currentApplicantIndex++;
    displayApplicant();
    checkNavigationButtons();
  }
});

searchButton.addEventListener("click", () => {
  const jobToSearch = searchInput.value;
  if (jobToSearch.trim() === "") {
    errorMessage.textContent = "Invalid search or No applications for this job";
    return;
  }

  filteredApplicants = filterApplicants(jobToSearch);
  if (filteredApplicants.length === 0) {
    errorMessage.textContent = "Invalid search or No applications for this job";
    resumeContent.innerHTML = "";
  } else {
    currentApplicantIndex = 0;
    displayApplicant();
    checkNavigationButtons();
    errorMessage.textContent = "";
  }
});
