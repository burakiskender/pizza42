interface IPizzaApiMenuRespose {
    menu: Array<string>;
  }
  interface IPizzaOrder {
    selectedItem: string;
  }
  interface IPizzaApiOrderResponse {
    orderId: number;
    order: IPizzaOrder;
  }
