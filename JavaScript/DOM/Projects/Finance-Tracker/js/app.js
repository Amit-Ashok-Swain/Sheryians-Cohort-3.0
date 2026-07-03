console.log("🚀 FinTrack Pro Started");

initializeStorage();
initializeSession();
initializeTheme();

if (document.querySelector("#loginForm")) {
    initializeAuth();
    protectGuestRoute();
}

if (document.querySelector("#registerForm")) {
    initializeAuth();
    protectGuestRoute();
}

if (document.querySelector("#forgotPasswordForm")) {
    initializeForgotPassword();
}

if (document.querySelector("#dashboardPage")) {


    window.history.replaceState(null, "", window.location.href);

    window.addEventListener("pageshow", function (event) {

    if (event.persisted) {

        protectRoute();

    }

    });

    protectRoute();

    initializeDashboard();
    initializeTransactions();
    initializeBudget();
    initializeChart();
    initializeChartEvents();
    initializeAnalytics();
    initializeSettings();
    initializeExport();
    initializeModal();

    refreshApplication();

    initializeMobileSidebar();
    
}



if (document.querySelector("#profileForm")) {
    protectRoute();
    initializeProfile();
}

if (document.querySelector("#changePasswordForm")) {
    protectRoute();
    initializeChangePassword();
}