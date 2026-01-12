// Script to seed dashboard with sample data
import fetch from 'node-fetch';

const API_BASE = 'http://localhost:3000';

// Sample users to create
const sampleUsers = [
  {
    name: 'Alice Johnson',
    email: 'alice.johnson@example.com',
    password: 'password123',
    role: 'content-manager'
  },
  {
    name: 'Bob Smith',
    email: 'bob.smith@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'Carol Davis',
    email: 'carol.davis@example.com',
    password: 'password123',
    role: 'user'
  },
  {
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    password: 'password123',
    role: 'content-manager'
  },
  {
    name: 'Eva Brown',
    email: 'eva.brown@example.com',
    password: 'password123',
    role: 'user'
  }
];

// Helper function to make API calls
async function apiCall(endpoint, options = {}) {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ADMIN_TOKEN || 'your-admin-token-here'}`,
        ...options.headers
      },
      ...options
    });

    const data = await response.json();
    return {
      success: response.ok,
      status: response.status,
      data
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

// Create sample users
async function createSampleUsers() {
  console.log('🌱 Seeding dashboard with sample users...\n');
  
  let created = 0;
  let skipped = 0;
  
  for (const user of sampleUsers) {
    console.log(`👤 Creating user: ${user.name} (${user.role})`);
    
    const result = await apiCall('/admin/users', {
      method: 'POST',
      body: JSON.stringify(user)
    });
    
    if (result.success) {
      console.log(`✅ Created: ${user.name}`);
      created++;
    } else if (result.data?.message?.includes('already exists')) {
      console.log(`⏭️  Skipped: ${user.name} (already exists)`);
      skipped++;
    } else {
      console.log(`❌ Failed: ${user.name} - ${result.data?.message || result.error}`);
    }
    
    // Small delay to avoid overwhelming the server
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`\n📊 Summary:`);
  console.log(`✅ Created: ${created} users`);
  console.log(`⏭️  Skipped: ${skipped} users`);
  console.log(`❌ Failed: ${sampleUsers.length - created - skipped} users`);
  
  return { created, skipped };
}

// Simulate some login activity
async function simulateLoginActivity() {
  console.log('\n🔄 Note: Login activity simulation would require actual login calls');
  console.log('   This would update lastLogin timestamps for existing users');
  console.log('   For now, the dashboard will show registration activity');
}

// Main seeding function
async function seedDashboard() {
  console.log('🚀 Dashboard Data Seeding Script\n');
  console.log('⚠️  Note: Make sure you have a valid admin token set in ADMIN_TOKEN environment variable');
  console.log('   or update the token in the apiCall function\n');
  
  try {
    const result = await createSampleUsers();
    await simulateLoginActivity();
    
    console.log('\n🎉 Dashboard seeding completed!');
    console.log('📊 You should now see user statistics and recent activity in the dashboard');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  }
}

// Run seeding if this file is executed directly
if (process.argv[1].endsWith('seed_dashboard_data.js')) {
  seedDashboard().catch(console.error);
}

export { seedDashboard, createSampleUsers };