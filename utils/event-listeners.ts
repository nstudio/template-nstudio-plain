import { topmost } from "tns-core-modules/ui/frame";
import { View } from "tns-core-modules/ui/core/view";
import { EventData } from "tns-core-modules/data/observable";
import { CLog } from "../services/logging.service";

export interface EventInfo {
  eventName: string;
  view: View;
  eventHandler: (args: EventData) => void;
  viewModel: any;
}

export class EventListeners {
  /**
   * Register the event listeners.
   * @param events [EventInfo]
   */
  public static registerEvents(events: EventInfo[]): EventInfo[] {
    if (!events) {
      return;
    }
    events.forEach(event => {
      const view = event.view;
      if (view) {
        CLog("Binding: " + view);
        view.on(event.eventName, event.eventHandler, event.viewModel);
      } else {
        // Error, no view with this id found:
        console.error(
          "Error while attempting to bind view with id " + event.view
        );
      }
    });

    // Return events array, for easy later unbinding:
    return events;
  }

  /**
   *   Unbind events.
   *   This is *VERY* important. If you don't do this, subsequent page
   *   unload-reloads will just add more of the same event handlers, so they
   *   will get called multiple times, and they will take up more and more
   *   memory.
   * @param events [EventInfo] - array of eventInfo objects.
   */
  public static unregisterEvents(events: EventInfo[]): EventInfo[] {
    if (!events) {
      return;
    }
    events.forEach(event => {
      const view = event.view;
      if (view) {
        CLog("Unbinding: " + view);
        view.off(event.eventName, event.eventHandler, event.viewModel);
      } else {
        // Error, no view with this id found:
        console.error(
          "Error while attempting to unbind view with id " + event.view
        );
      }
    });

    // Just return events array, maybe useful for later binding again:
    return events;
  }
}
