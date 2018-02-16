import { Observable } from "tns-core-modules/data/observable";
import { Page } from "tns-core-modules/ui/page/page";
import { ObservableProperty } from "../../utils";

export class HomeViewModel extends Observable {
  @ObservableProperty() public users;

  constructor(page: Page) {
    super();
    this.users = [
      { name: "Billy Bob" },
      { name: "Tweeder" },
      { name: "Mox" },
      { name: "Coach" },
      { name: "Lance" },
      { name: "Johnson" },
      { name: "William" },
      { name: "Franklin" },
      { name: "Billy Bob" },
      { name: "Tweeder" },
      { name: "Mox" },
      { name: "Coach" },
      { name: "Lance" },
      { name: "Johnson" },
      { name: "William" },
      { name: "Franklin" }
    ];
  }

  public fabTap() {
    console.log("fab tap");
  }
}
