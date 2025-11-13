// import { ChangeDetectionStrategy, Component, signal, computed } from '@angular/core';
// import { CommonModule, TitleCasePipe } from '@angular/common'; // <-- Import CommonModule and TitleCasePipe

// // Interfaces for structured data
// interface NavItem {
//   id: 'home' | 'profile' | 'admin' | 'requests' | 'logout';
//   label: string;
//   icon: string;
//   role: 'user' | 'admin';
// }

// interface User {
//   name: string;
//   email: string;
//   role: 'user' | 'admin';
// }

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [CommonModule], // <-- Add CommonModule here to provide access to its pipes (like TitleCasePipe)
//   template: `
//     <div class="flex h-screen bg-gray-50">
//       <!-- Sidebar (Desktop View) -->
//       <aside [class.hidden]="!isSidebarOpen()" class="lg:flex flex-shrink-0 w-64 bg-gray-800 text-white flex-col border-r border-gray-700">
//         <div class="h-16 flex items-center justify-start px-6">
//           <span class="text-xl font-bold text-indigo-400 tracking-wider">Angular JWT App</span>
//         </div>
//         <nav class="flex-1 overflow-y-auto pt-4 pb-4">
//           <ul>
//             @for (item of navigationItems; track item.id) {
//               <!-- Check if the user is authorized to see the link -->
//               @if (currentUser.role === 'admin' || item.role === 'user') {
//                 <li (click)="navigateTo(item.id)"
//                     [class]="getNavLinkClass(item.id)">
//                   <div class="w-6 h-6 mr-3">
//                     <svg class="w-full h-full fill-current" viewBox="0 0 24 24" [innerHTML]="item.icon"></svg>
//                   </div>
//                   {{ item.label }}
//                 </li>
//               }
//             }
//           </ul>
//         </nav>
//         <div class="px-6 py-4 border-t border-gray-700">
//           <div class="text-sm font-semibold">{{ currentUser.name }}</div>
//           <div class="text-xs text-gray-400">{{ currentUser.role | titlecase }} Account</div>
//         </div>
//       </aside>

//       <!-- Main Content Area -->
//       <main class="flex-1 flex flex-col overflow-hidden">
//         <!-- Header / Top Bar -->
//         <header class="flex-shrink-0 border-b bg-white shadow-sm h-16 flex items-center justify-between px-4 lg:px-8">
//           <div class="flex items-center">
//             <!-- Mobile Menu Button -->
//             <button (click)="toggleSidebar()" class="lg:hidden text-gray-600 hover:text-gray-900 focus:outline-none mr-4">
//               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
//             </button>
//             <h1 class="text-2xl font-semibold text-gray-800">{{ currentTitle() }}</h1>
//           </div>
//           <div class="flex items-center space-x-4">
//             <span class="text-sm text-gray-600 hidden sm:block">Welcome, {{ currentUser.name }}</span>
//             <button (click)="navigateTo('profile')" class="p-2 rounded-full text-gray-600 hover:bg-gray-100 transition">
//               <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
//             </button>
//             <button (click)="navigateTo('logout')" class="text-red-500 hover:text-red-700 transition font-medium text-sm">Logout</button>
//           </div>
//         </header>

//         <!-- Page Content Area -->
//         <div class="flex-1 overflow-y-auto p-4 md:p-8">
//           <div class="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-100">
//             @switch (currentPage()) {
//               @case ('home') {
//                 <div class="animate-fadeIn">
//                   <h2 class="text-3xl font-extrabold text-gray-900 mb-2">Hi {{ currentUser.name.split(' ')[0] }}!</h2>
//                   <p class="text-xl text-indigo-600">You're successfully logged in with Angular 15 & JWT!</p>

//                   <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div class="bg-indigo-50 border border-indigo-200 p-6 rounded-lg shadow-md">
//                       <h3 class="text-xl font-bold text-indigo-700 mb-2">System Status</h3>
//                       <p class="text-gray-600">All services operational. Token refresh is active.</p>
//                     </div>
//                     <div class="bg-white border border-gray-200 p-6 rounded-lg shadow-md">
//                       <h3 class="text-xl font-bold text-gray-700 mb-2">Quick Actions</h3>
//                       <button (click)="navigateTo('profile')" class="mt-2 w-full text-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none transition">
//                         View My Profile
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               }
//               @case ('profile') {
//                 <div class="animate-fadeIn">
//                   <h2 class="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">My Profile</h2>

//                   <div class="space-y-4">
//                     <p class="text-lg">
//                       <strong class="font-semibold text-gray-700 mr-2">Name:</strong>
//                       <span class="text-gray-600">{{ currentUser.name }}</span>
//                     </p>
//                     <p class="text-lg">
//                       <strong class="font-semibold text-gray-700 mr-2">Email:</strong>
//                       <span class="text-gray-600">{{ currentUser.email }}</span>
//                     </p>
//                     <p class="text-lg">
//                       <strong class="font-semibold text-gray-700 mr-2">Role:</strong>
//                       <span [class]="currentUser.role === 'admin' ? 'text-red-600 font-bold' : 'text-green-600 font-bold'">
//                         {{ currentUser.role | titlecase }}
//                       </span>
//                     </p>
//                   </div>

//                   <button (click)="showUpdateMessage()" class="mt-8 py-2 px-6 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition">
//                     Update Profile
//                   </button>
//                 </div>
//               }
//               @case ('admin') {
//                 <div class="animate-fadeIn">
//                   <h2 class="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">Admin Dashboard</h2>

//                   @if (currentUser.role === 'admin') {
//                     <div class="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 p-4 rounded-md mb-6" role="alert">
//                       <p class="font-bold">Privileged Access</p>
//                       <p>You have full administrative privileges to manage users and system settings.</p>
//                     </div>

//                     <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         <div class="bg-white p-5 rounded-lg shadow hover:shadow-xl transition duration-300 border border-gray-100">
//                           <p class="text-gray-500">Total Users</p>
//                           <p class="text-3xl font-bold text-gray-800 mt-1">452</p>
//                         </div>
//                         <div class="bg-white p-5 rounded-lg shadow hover:shadow-xl transition duration-300 border border-gray-100">
//                           <p class="text-gray-500">Open Requests</p>
//                           <p class="text-3xl font-bold text-red-500 mt-1">12</p>
//                         </div>
//                         <div class="bg-white p-5 rounded-lg shadow hover:shadow-xl transition duration-300 border border-gray-100">
//                           <p class="text-gray-500">System Uptime</p>
//                           <p class="text-3xl font-bold text-green-500 mt-1">99.9%</p>
//                         </div>
//                     </div>
//                   } @else {
//                     <div class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md" role="alert">
//                       <p class="font-bold">Access Denied</p>
//                       <p>You do not have permission to view the administrative panel.</p>
//                     </div>
//                   }
//                 </div>
//               }
//               @case ('requests') {
//                 <div class="animate-fadeIn">
//                   <h2 class="text-3xl font-extrabold text-gray-900 mb-6 border-b pb-2">Service Requests</h2>

//                   <div class="space-y-4">
//                     <div class="border border-gray-200 p-4 rounded-lg shadow-sm">
//                       <p class="font-semibold text-gray-800">Request ID: #8754</p>
//                       <p class="text-sm text-gray-500">Issue: Password Reset - Status: <span class="text-yellow-600 font-medium">Pending</span></p>
//                     </div>
//                     <div class="border border-gray-200 p-4 rounded-lg shadow-sm">
//                       <p class="font-semibold text-gray-800">Request ID: #8753</p>
//                       <p class="text-sm text-gray-500">Issue: Role Upgrade - Status: <span class="text-green-600 font-medium">Completed</span></p>
//                     </div>
//                     <div class="border border-gray-200 p-4 rounded-lg shadow-sm">
//                       <p class="font-semibold text-gray-800">Request ID: #8752</p>
//                       <p class="text-sm text-gray-500">Issue: Account Deactivation - Status: <span class="text-red-600 font-medium">Rejected</span></p>
//                     </div>
//                   </div>
//                 </div>
//               }
//               @case ('logout') {
//                 <div class="animate-fadeIn text-center py-20">
//                   <h2 class="text-3xl font-extrabold text-red-600 mb-4">Logging Out...</h2>
//                   <p class="text-gray-500">Thank you for using the Angular JWT application.</p>
//                 </div>
//               }
//               @default {
//                 <div class="text-center py-20">
//                   <h2 class="text-3xl font-extrabold text-gray-900 mb-4">404 - Page Not Found</h2>
//                   <p class="text-gray-500">The requested page does not exist. Please use the navigation menu.</p>
//                 </div>
//               }
//             }
//           </div>
//         </div>
//       </main>
      
//       <!-- Custom Message Modal -->
//       @if (message.text) {
//         <div class="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center transition-opacity duration-300">
//           <div class="bg-white p-6 rounded-lg shadow-2xl max-w-sm w-full transform scale-100 transition-transform duration-300">
//             <h3 class="text-xl font-bold mb-3" [class]="message.type === 'success' ? 'text-green-600' : 'text-blue-600'">{{ message.title }}</h3>
//             <p class="text-gray-600 mb-4">{{ message.text }}</p>
//             <button (click)="clearMessage()" class="w-full py-2 px-4 rounded-lg text-white font-semibold"
//                     [class]="message.type === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-500 hover:bg-blue-600'">
//               Close
//             </button>
//           </div>
//         </div>
//       }

//     </div>
//   `,
//   styles: [`
//     /* Custom utility for titlecase pipe simulation */
//     :host {
//       display: contents;
//     }
    
//     /* Animation for content loading */
//     @keyframes fadeIn {
//       from { opacity: 0; transform: translateY(10px); }
//       to { opacity: 1; transform: translateY(0); }
//     }
//     .animate-fadeIn {
//       animation: fadeIn 0.5s ease-out;
//     }
//   `],
//   changeDetection: ChangeDetectionStrategy.OnPush,
// })
// export class App {
//   // Mock User Data and State
//   currentUser: User = {
//     name: 'Mr Kent Bandico',
//     email: 'kent@gmail.com',
//     role: 'admin', // Set to 'user' or 'admin' to test access control
//   };

//   // State Signals
//   currentPage = signal<'home' | 'profile' | 'admin' | 'requests' | 'logout'>('home');
//   isSidebarOpen = signal(true); // Always open on large screens, controlled on mobile
//   message = signal<{ title: string, text: string, type: 'info' | 'success' | '' }>({ title: '', text: '', type: '' });

//   // Navigation Data Structure
//   navigationItems: NavItem[] = [
//     { id: 'home', label: 'Home', role: 'user', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>' },
//     { id: 'profile', label: 'Profile', role: 'user', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>' },
//     { id: 'admin', label: 'Admin', role: 'admin', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.044M12 14c1.114 0 2.18.238 3.14 0l.44.44a1 1 0 010 1.414l-.707.707a1 1 0 01-1.414 0l-1.414-1.414a1 1 0 010-1.414l1.414-1.414a1 1 0 011.414 0l.707.707a1 1 0 010 1.414l-.44.44A7 7 0 0012 14zM12 14h.01"/>' },
//     { id: 'requests', label: 'Requests', role: 'user', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>' },
//     { id: 'logout', label: 'Logout', role: 'user', icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>' }
//   ];

//   // Computed property to display the current page title in the header
//   currentTitle = computed(() => {
//     const current = this.currentPage();
//     const item = this.navigationItems.find(i => i.id === current);
//     // Capitalize the label or fallback to a default
//     return item ? item.label.charAt(0).toUpperCase() + item.label.slice(1) : 'Dashboard';
//   });

//   constructor() {
//     // Set initial sidebar state based on screen size (for responsiveness)
//     if (typeof window !== 'undefined') {
//       const isLargeScreen = window.innerWidth >= 1024; // lg: breakpoint
//       this.isSidebarOpen.set(isLargeScreen);
//       // Listen for screen resize to adjust sidebar visibility
//       window.addEventListener('resize', this.onResize.bind(this));
//     }
//   }

//   onResize(event: Event) {
//     const isLargeScreen = (event.target as Window).innerWidth >= 1024;
//     this.isSidebarOpen.set(isLargeScreen);
//   }

//   // Navigation Logic
//   navigateTo(page: 'home' | 'profile' | 'admin' | 'requests' | 'logout'): void {
//     if (page === 'logout') {
//       // Simulate logout action and then navigate to a "logging out" view
//       this.currentPage.set(page);
//       setTimeout(() => {
//         // In a real app, you would clear the JWT token and redirect here.
//         this.showMessage('Logout Successful', 'You have been successfully logged out from the application.', 'success');
//         this.navigateTo('home'); // Redirect back to home/login screen simulation
//       }, 2000);
//       return;
//     }

//     // Check for Admin access before navigation
//     if (page === 'admin' && this.currentUser.role !== 'admin') {
//       this.showMessage('Access Required', 'You must be an administrator to access the Admin panel.', 'info');
//       return;
//     }

//     this.currentPage.set(page);
//     // Close sidebar on mobile after navigation
//     if (window.innerWidth < 1024) {
//       this.isSidebarOpen.set(false);
//     }
//   }

//   // Utility to get Tailwind classes for navigation links
//   getNavLinkClass(id: NavItem['id']): string {
//     const baseClasses = 'flex items-center px-6 py-3 text-sm font-medium transition duration-150 ease-in-out cursor-pointer ';
//     if (this.currentPage() === id) {
//       // Active state classes
//       return baseClasses + 'bg-gray-700 text-indigo-400 border-l-4 border-indigo-400';
//     } else {
//       // Inactive state classes
//       return baseClasses + 'text-gray-300 hover:bg-gray-700 hover:text-white';
//     }
//   }

//   // Toggle sidebar for mobile
//   toggleSidebar(): void {
//     this.isSidebarOpen.update(val => !val);
//   }

//   // Simulate "Update Profile" button click
//   showUpdateMessage(): void {
//     this.showMessage(
//       'Form Submission Mock',
//       'The profile update form has been submitted successfully (simulated).',
//       'success'
//     );
//   }

//   // Custom Message Box/Modal Logic (replacing alert())
//   showMessage(title: string, text: string, type: 'info' | 'success'): void {
//     this.message.set({ title, text, type });
//   }

//   clearMessage(): void {
//     this.message.set({ title: '', text: '', type: '' });
//   }
// }