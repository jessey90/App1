import { companies, posts } from '../backend/mockData.js';

console.log('--- Verifying Backend Data ---');

console.log(`Total companies loaded: ${companies.length}`);
if (companies.length !== 1000) {
    console.error('FAIL: Expected 1000 companies');
    process.exit(1);
} else {
    console.log('PASS: 1000 companies loaded');
}

// Check a few known companies
const amazon = companies.find(c => c.id === 'amazon');
if (amazon && amazon.name === 'Amazon') {
    console.log('PASS: Amazon found');
} else {
    console.error('FAIL: Amazon not found or incorrect');
}

// Verify posts have valid company IDs
console.log(`Total posts: ${posts.length}`);
const invalidPosts = posts.filter(p => !companies.some(c => c.id === p.companyId));
if (invalidPosts.length > 0) {
    console.error('FAIL: Found posts with invalid company IDs:', invalidPosts.map(p => p.id));
    process.exit(1);
} else {
    console.log('PASS: All posts have valid company IDs');
}

console.log('--- Verification Complete ---');
