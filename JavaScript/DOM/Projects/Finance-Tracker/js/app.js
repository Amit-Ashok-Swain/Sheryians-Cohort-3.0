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

    protectRoute();

    initializeDashboard();
    initializeTransactions();
    initializeBudget();
    initializeChart();
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