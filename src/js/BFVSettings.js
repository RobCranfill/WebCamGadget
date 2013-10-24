// VuirMiewSettings.js - rob cranfill 2011

// These duplicate values in the main .js file - fix??
var KEY_URL = "URL";
var KEY_REFRESH = "refreshSeconds";
var GROUP_NAME = "Options";

var editMode_ = false;

// This method (somewhat confusingly-named) is called when the dialog loads.
// 
function loadSettings()
  {
  
  SettingsManager.loadFile();

  System.Gadget.onSettingsClosing = settingsClosing;

  //var sURL = System.Gadget.Settings.readString(KEY_URL);
  var sURL = SettingsManager.getValue(GROUP_NAME, KEY_URL);
  if (sURL == "")	// shouldn't happen
    {
    sURL = "(unset!)";
    }
  var urlControl = document.getElementById("fieldURL");
  urlControl.value = sURL;

  // Disable until magic key is pressed.
  fieldURL.disabled = true;
  
  //var sRefresh = System.Gadget.Settings.readString(KEY_REFRESH);
  var sRefresh = SettingsManager.getValue(GROUP_NAME, KEY_REFRESH);
  if (sRefresh == "")
    {
    sRefresh = "?";
    }
  else 
    {
    if (isNaN(sRefresh))
      {
      sRefresh = "'" + sRefresh + "'!";
      }
    else 
      {
      // saved value is seconds, we want user to manipulate minutes.
      var minutes = parseInt(sRefresh) / 60;
      sRefresh = minutes.toString();
      }
    }
  var refreshControl = document.getElementById("fieldRefresh");
  refreshControl.value = sRefresh;

  fieldRefresh.select(); // select this field for user input
  
  }


//
// Handle the Settings dialog closing event.
// Parameters: event.
//
function settingsClosing(event)
  {
  // Save the settings if the user clicked OK.
  if (event.closeAction == event.Action.commit)
    {
    var urlControl = document.getElementById("fieldURL");
    var sURL = urlControl.value;
    
    var refreshControl = document.getElementById("fieldRefresh");
    var nRefresh = parseInt(refreshControl.value) * 60;		// convert minutes to seconds

    if (isValidURL(sURL) && isValidInteger(nRefresh))
      {
//      System.Gadget.Settings.writeString(KEY_URL,     sURL);
//      System.Gadget.Settings.writeString(KEY_REFRESH, nRefresh.toString());

      SettingsManager.setValue(GROUP_NAME, KEY_URL,     sURL);
      SettingsManager.setValue(GROUP_NAME, KEY_REFRESH, nRefresh.toString());
      SettingsManager.saveFile();

      event.cancel = false;
      }
    else
      {
      event.cancel = true;
      }
    }
  }


// where does the magic 'event' param come from???
function keyPressed()
  {
  switch(event.keyCode)
    {
    case 17:	// control key
      editMode_ = !editMode_;
      updateEditMode();
      break;
    }
  }

function updateEditMode()
{
  fieldURL.disabled = !editMode_;
}

// -------------------------------------------------
// Allow a non-negative integer only. XXX TODO
// Parameter: input string.
// -------------------------------------------------
function isValidInteger(sUserInput)
  {
  return true;
  //var regexp = ^\d+$;
  //return regexp.test(sUserInput);
  }

// -------------------------------------------------
// Allow ... uh, whatever's a good URL. XXX TODO
// Parameter: input string.
// 
// The following is a loose example that only allows 
// alphanumerics, periods, dashes, and spaces.
// -------------------------------------------------
function isValidURL(sUserInput)
  {
  return true;
  // var regexp = /[\.\w\-\\s]$/gi;
  // return regexp.test(sUserInput);
  }
