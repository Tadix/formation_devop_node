
class Commande {
    constructor(id, client, items, total, date, status) {
        this.id = id;
        this.client = client;
        this.items = items;
        this.total = total;
        this.date = date;
        this.status = status;
    }

  
    addItem(item) {
        this.items.push(item);
        this.calculateTotal();
    }


    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.calculateTotal();
    }


    calculateTotal() {
        this.total = this.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    }

  
    updateStatus(newStatus) {
        this.status = newStatus;
    }

}


module.exports = Commande;
