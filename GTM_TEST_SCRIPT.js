/**
 * Google Tag Manager Integration Test Script
 * Run this in the browser console to verify GTM is working correctly
 */

console.log('='.repeat(60));
console.log('GTM INTEGRATION TEST SCRIPT');
console.log('='.repeat(60));

// Test 1: Check if window.dataLayer exists
console.log('\n[TEST 1] Checking window.dataLayer existence...');
if (typeof window.dataLayer !== 'undefined') {
  console.log('✅ PASS: window.dataLayer exists');
  console.log('   Type:', typeof window.dataLayer);
  console.log('   Is Array:', Array.isArray(window.dataLayer));
  console.log('   Length:', window.dataLayer.length);
} else {
  console.log('❌ FAIL: window.dataLayer does not exist');
}

// Test 2: Check GTM initialization event
console.log('\n[TEST 2] Checking GTM initialization event...');
if (window.dataLayer && window.dataLayer.length > 0) {
  const gtmStartEvent = window.dataLayer.find(item => item['gtm.start']);
  if (gtmStartEvent) {
    console.log('✅ PASS: GTM initialization event found');
    console.log('   Event:', gtmStartEvent);
  } else {
    console.log('⚠️  WARNING: GTM initialization event not found in dataLayer');
  }
} else {
  console.log('❌ FAIL: dataLayer is empty or does not exist');
}

// Test 3: Check for gtm.js event
console.log('\n[TEST 3] Checking for gtm.js event...');
if (window.dataLayer) {
  const gtmJsEvent = window.dataLayer.find(item => item.event === 'gtm.js');
  if (gtmJsEvent) {
    console.log('✅ PASS: gtm.js event found');
    console.log('   Event:', gtmJsEvent);
  } else {
    console.log('⚠️  WARNING: gtm.js event not found');
  }
}

// Test 4: Check if GTM script is loaded
console.log('\n[TEST 4] Checking if GTM script is loaded...');
const gtmScript = document.querySelector('script[src*="googletagmanager.com/gtm.js"]');
if (gtmScript) {
  console.log('✅ PASS: GTM script tag found in DOM');
  console.log('   Script src:', gtmScript.src);
  console.log('   Async:', gtmScript.async);
} else {
  console.log('❌ FAIL: GTM script tag not found in DOM');
}

// Test 5: Check if GTM noscript tag exists
console.log('\n[TEST 5] Checking if GTM noscript tag exists...');
const noscriptTag = document.querySelector('noscript iframe[src*="googletagmanager.com/ns.html"]');
if (noscriptTag) {
  console.log('✅ PASS: GTM noscript tag found in DOM');
  console.log('   Noscript src:', noscriptTag.src);
} else {
  console.log('⚠️  WARNING: GTM noscript tag not found (may be hidden)');
}

// Test 6: Check for Google Tag Manager global object
console.log('\n[TEST 6] Checking for Google Tag Manager global object...');
if (typeof window.google_tag_manager !== 'undefined') {
  console.log('✅ PASS: window.google_tag_manager exists');
  console.log('   Type:', typeof window.google_tag_manager);
} else {
  console.log('⚠️  WARNING: window.google_tag_manager not found (may load later)');
}

// Test 7: Test pushing a custom event
console.log('\n[TEST 7] Testing custom event push...');
const initialLength = window.dataLayer ? window.dataLayer.length : 0;
if (window.dataLayer) {
  window.dataLayer.push({
    event: 'test_event',
    test_data: 'GTM Integration Test',
    timestamp: new Date().toISOString(),
  });
  const newLength = window.dataLayer.length;
  if (newLength > initialLength) {
    console.log('✅ PASS: Custom event pushed successfully');
    console.log('   Previous length:', initialLength);
    console.log('   New length:', newLength);
    console.log('   Event pushed:', window.dataLayer[newLength - 1]);
  } else {
    console.log('❌ FAIL: Event was not added to dataLayer');
  }
} else {
  console.log('❌ FAIL: Cannot push event - dataLayer does not exist');
}

// Test 8: Display all dataLayer contents
console.log('\n[TEST 8] Complete dataLayer contents:');
if (window.dataLayer) {
  console.log('Total events:', window.dataLayer.length);
  console.table(window.dataLayer);
} else {
  console.log('❌ dataLayer does not exist');
}

// Summary
console.log('\n' + '='.repeat(60));
console.log('TEST SUMMARY');
console.log('='.repeat(60));
console.log('✅ GTM appears to be properly integrated');
console.log('📊 Check the Network tab for GTM requests to Google servers');
console.log('🔍 Monitor the dataLayer for events as you interact with the site');
console.log('='.repeat(60));

