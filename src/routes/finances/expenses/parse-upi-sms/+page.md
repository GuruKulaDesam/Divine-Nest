# UPI SMS Parsing

This page allows you to paste a UPI transaction SMS and see how it is parsed into a structured expense record. For real automation, SMS reading must be done on Android using a native app or wrapper.

## How to Use

1. Copy a UPI transaction SMS from your phone (e.g., from BHIM, PhonePe, Google Pay).
2. Paste it into the text area.
3. Click "Parse SMS" to see the extracted transaction details.

## Example SMS

- BHIM: `Rs. 500 debited via UPI. Txn ID: 123ABC456. To: Ramesh Kumar.`
- PhonePe: `Paid ₹1,200 to Big Bazaar via UPI. Txn ID: XYZ789.`
- Google Pay: `You sent ₹750 to Amma. UPI Ref: GPay123456.`

## Note

- This is a demo for parsing logic only. Automatic SMS reading is not possible in a web app due to browser security.
- For full automation, integrate this parser with a native Android app or a hybrid wrapper (Capacitor/Cordova).
