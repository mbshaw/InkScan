# InkScan

This application is designed to capture the ink batch codes use for each print job. The table can be saved as a CSV file to the device. 

# Using the app
* Turn on the Bluetooth Scanner. It should already be paired and will automatically connect to the tablet. if nto see instructions below to set it up.
* Open the **Ink Scan** app from the icon on the device
the date field will contain todays date. You can change this if you want to use a different date but be consistent with the date format i.e. dd/mm/yyyy
* Enter the Job number in the 'Job Number' field below
* Tap on the Barcode field to select it (it will have a blue border to sow it is selected)
* Scan the barcode of the ink batch codes. this will create a new line in the table

## Save table as CSV
The save as CSV button will 

## Clear Table
This button will clear the table without saving any data

## Load Previously saved CSV into table
**In Development**

# reload the app

## remove the old app
Press and hold the app icon untill icons appear at the top of the page to move or delete.
Drag the app icon onto the delete icon and it will dissapear

# Install the App for offline use
* Goto https://mbshaw.github.io/inkscan/ in a browser on the devicce.
* Once loaded tap the menu button at the top left of the browser window (Three vertical dots)
* Select 'Add to Home Screen'
* A popup wil appear wher you can edit the App name, Click 'OK'
* Return to home screen and swipe teh pages untill you find the app.
* Tap on Icon to launch App

# Setup scanner and soft keyboard

## Connecting a bluetooth barcode reader

* turn on the Bluetooth Scanner
* Enable Bluetooth on your device
  * Go to Settings --> connections --> Bluetooth 
  * tap 'Pair device' and select wireless scanner

https://www.waspbarcode.com/barcode-scanners/wws100i-pocket-barcode-scanner



## Enabling the on screen keybaord with a bluetooth barcode reader

Attaching a Bluetooth barcode reader in HID mode (Acts as a keybaord not a serial input) make the device think there is already a keyboard attached so will not display the screen keyboard when text entry is required. You will need to change settings in the tablet to solve this.
To enable both a BT barcode scanner and the screen keyboard:
* Settings --> General Management
* Tap Language & Input
* Tap Physical Keyboard 
* Select 'Show on-screen keyboard'

# ToDo
- [ ] Ensure app works fully offline
- [ ] Import saved csv files to app table
- [ ] Allow editing of table cells in app
