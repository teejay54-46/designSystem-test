# Learning Notes

My personal notes while learning Git and GitHub with this fork of the
Simple Design System (SDS).

## What I've done so far
- Forked figma/sds into my account
- Cloned my fork with GitHub Desktop
- Practised the full Git cycle: branch -> edit -> commit -> push -> PR -> merge -> pull
- Set up OrbStack (Docker) and ran the app inside a container

## Running the app (cold start)

Everything runs inside a container, so nothing is installed on the Mac
except OrbStack and the downloaded Node image.

1. Start **OrbStack** (Applications, or Spotlight). Check for its menu-bar icon.
2. Open **Terminal** (Applications > Utilities).
3. Go to the project folder:
   ```
   cd "/Users/timjohnstone/Documents/Design/AI/GitHub Demo/designSystem-test/Untitled/designSystem-test"
   ```
   (Tip: type `cd ` then drag the folder from Finder onto the Terminal window.)
4. Start it:
   ```
   ./dev.sh              # app at       http://localhost:8000
   ./dev.sh storybook    # Storybook at http://localhost:6006
   ```
5. Open the URL in a browser.

When done: click the Terminal window and press **Ctrl+C** to stop the server.

Notes:
- Dependencies persist in `node_modules`, so restarts take only a few seconds.
- GitHub Desktop / an editor are only needed to *change* files, not to run the app.
- If Terminal says `docker: command not found`, open OrbStack, let it
  reinstall the command-line tools, then open a fresh Terminal window.

## Practice log
- First change: added this file.
- Added `dev.sh` (container run helper) and these cold-start notes.
