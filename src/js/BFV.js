//
// Javascript for BFV.
// rob cranfill, 2013

// Default values; if this gadget has never run before, these values will be persisted.
// This duplicates a value in the settings.js file - fix??
var imageURL_ = "http://www.wasar.org/wp-content/themes/wasar/kbfi/north-small.php";
var refreshTimeSeconds_ = new Number(120);

var IMAGE_W = 640
var IMAGE_H = 360
var SCALE_DOCKED   = 1;
var SCALE_UNDOCKED = 2;

// These duplicate values in the settings.js file - fix??
var KEY_URL = "URL";
var KEY_REFRESH = "refreshSeconds";
var GROUP_NAME = "Options";

var timer_ = null;

// This is invoked on page load.
//
function loadMain()
{

  ahISeeYouHaveTheMachineThatGoesBING();

  // Use the dock state method to set our size. TODO: persist this?
  System.Gadget.onDock   = checkDockState;
  System.Gadget.onUndock = checkDockState;
  checkDockState();

  loadSettings();

  // this is too often, but works.
  saveSettings();

  System.Gadget.settingsUI = "BFVSettings.html";

  refreshView();

  // Start a time to call refreshView again.
  runTimer(refreshTimeSeconds_, "refreshView()");
  }


// (Re)display the image. Called periodically.
//
function refreshView() 
  {
  var pic = document.getElementById("viewPicture");
 
  // workaround for IE's refusing to reload the same URL: add fake param that changes every time (haha - "time", get it?).
  pic.src = imageURL_ + "?foo=" + new Date().getTime();
  
  ahISeeYouHaveTheMachineThatGoesBING();
 
  }


// Set a timer to call the given function in the indicated number of seconds.
// Can be fractional and less than 1.0.
//
function runTimer(timeoutSec, functionToCall) 
  {
  if (timer_ === null)
    {
    }
  else
    {
    clearInterval(timer_);
    }
  if (timeoutSec >= 0)
    {
    timer_ = setInterval(functionToCall, timeoutSec * 1000);
    }
  }


// Load settings to globals.
// Sets imageURL_ and refreshTimeSeconds_
//
function loadSettings()
  {
  
  SettingsManager.loadFile();

// oops - this URL shouldn't be here!
  var sURL = SettingsManager.getValue(GROUP_NAME, KEY_URL, "http://www.wasar.org/wp-content/themes/wasar/kbfi/north-small.php");

  var sRefresh = SettingsManager.getValue(GROUP_NAME, KEY_REFRESH, "120");
  if (sRefresh == "" || isNaN(sRefresh))
    {
    sRefresh = "240";	// a different value, for debugging purposes
    }
  else
    {
    refreshTimeSeconds_ = parseInt(sRefresh);
    }

  }


function saveSettings()
  {
//  System.Gadget.Settings.writeString(KEY_URL,     imageURL_);
//  System.Gadget.Settings.writeString(KEY_REFRESH, refreshTimeSeconds_.toString());

  SettingsManager.setValue(GROUP_NAME, KEY_URL, imageURL_);
  SettingsManager.setValue(GROUP_NAME, KEY_REFRESH, refreshTimeSeconds_.toString());
  SettingsManager.saveFile();
  }


// Zoom in or out
//
function checkDockState()
  {
  System.Gadget.beginTransition();

  if (System.Gadget.docked)
    {
    document.body.style.width  = IMAGE_W * SCALE_DOCKED;
    document.body.style.height = IMAGE_H * SCALE_DOCKED;
    }
  else
    {
    document.body.style.width  = IMAGE_W * SCALE_UNDOCKED;
    document.body.style.height = IMAGE_H * SCALE_UNDOCKED;
    }
  System.Gadget.endTransition(System.Gadget.TransitionType.morph, 2);
  }


function ahISeeYouHaveTheMachineThatGoesBING()
  {
  // System.Sound.beep();
  }
 
 

