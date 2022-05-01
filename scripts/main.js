// Michael East and Rupert Taylor

// Store Management Software

import { nanoid } from "https://cdn.skypack.dev/nanoid";

/* Item in Store
- ID/Barcode - Make this unchangeable?
- Item Name
- Item cost_Price
- Item selling_price
- Item Category
- Item In Stock
*/

class Item {
	constructor(name, costPrice, sellingPrice, category, inStock, id){
    if(!(typeof name === 'string')){
      throw new Error(`Expected string for property name but received ${name} (type: ${typeof name})`);
    }
    if (name.length === 0) {
      throw new Error(`The name field is required`);
    }

	  this.name = name;
	  this.costPrice = costPrice;
    this.sellingPrice = sellingPrice;
	  this.category = category;
    this.inStock = inStock
	  this._id = id || nanoid();
	}
  }

  
  /* Store Management Software
  - Items Array
  
  Methods:
  - addItems
  - removeItems
  - updatePrice?
  - View in Stock items?
  */

  class ManageStore {
	  items = [];
	  addItem (data){
		let _item = data
		if(!(data instanceof Item)){
			_item = new Item(data.name, data.costPrice, data.sellingPrice, data.category, data.inStock, data._id);
		}
		this.items.push(_item);
    return _item._id;
	  }

	  removeItem(id){
      const idx = this.items.findIndex(function(item){
        return item._id === id;
      });
      this.items.splice(idx, 1);
	  }

	  updateItem(id, updates){
      const idx = this.items.findIndex(function (item){
        return item._id === id;
      });
      const item = this.items[idx];
      Object.assign(item, updates);
      
	  }
    
    // | Look up whether something has the value true for 'in stock'
    // | Copy it into a new array
    // | Console.Log the new Array

    seeInStock() {
      const inStockItems = this.items.filter(function(item){
        return item.inStock === true;
      });
      console.log('Our In Stock Items:', inStockItems);
    }

    // | Change instock to false
    // | Print out Congrats Message, with profit count

    sellItem(id) {
      const idx = this.items.findIndex(function (item){
        return item._id === id;
      });
      const item = this.items[idx];
      item.inStock = false;
      console.log(`You sold ${item.name} and your profit is:`, item.sellingPrice - item.costPrice);
    }
  }


// * Creating a Store

 const ourStore = new ManageStore();
  
  // * Creating some items


  const item1 = {
    name: 'New York Skyline Painting',
    costPrice: 6000, 
    sellingPrice: 10000,
    category: 'Art', 
    inStock: true,
  }

  const item2 = {
    name: 'Gold Floor Lamp',
    costPrice: 1000, 
    sellingPrice: 2000,
    category: 'Homeware', 
    inStock: true,
  }

  const item3 = {
    name: 'Gold Desk Lamp',
    costPrice: 600, 
    sellingPrice: 1000,
    category: 'Homeware', 
    inStock: true,
  }

  const item4 = {
    name: 'Blue Desk Lamp',
    costPrice: 600, 
    sellingPrice: 1000,
    category: 'Homeware', 
    inStock: true,
  }


  // * Adding items into ourStore

  const newItemId1 = ourStore.addItem(item1);
  const newItemId2 = ourStore.addItem(item2);
  const newItemId3 = ourStore.addItem(item3);
  const newItemId4 = ourStore.addItem(item4);


// * Remove Item

ourStore.removeItem(newItemId1);

// * Updating an Item

const itemUpdate = {
  sellingPrice: 50000,
}

ourStore.updateItem(newItemId2, itemUpdate);

// * View items in stock

ourStore.seeInStock();

// * Selling an item, and getting the profit margin

ourStore.sellItem(newItemId2);


console.log('Our Store Items:', ourStore);

