import prisma from '../config/db.js';


//total price and quant are calculated temporarily, not added to any tables
//will be added to order table once user confirms order
export const viewCart = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const allItems = await prisma.cartItem.findMany({where: {user_id: id}});
        const totalItems = await prisma.cartItem.aggregate({where: {user_id: id}, _sum: {quantity: true}});
        const totalItemsCount = totalItems._sum.quantity || 0;
        const totalPrice = await prisma.cartItem.aggregate({where: {user_id: id}, _sum: {totalPrice: true}});
        const totalPriceSum = totalPrice._sum.totalPrice || 0;
        res.json({allItems, totalItemsCount, totalPriceSum});
    } catch(err) {
        res.status(500).json({error: err.message});
    }
}

export const addToCart = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const productId = parseInt(req.params.id);
        //finding the current quantity
        const currentQuant = await prisma.cartItem.findFirst({where: {product_id: productId, user_id: id}, select: {quantity: true}});
        if (currentQuant?.quantity >= 1 && currentQuant != null) {
            return res.json('already in cart!');
        } 
        //finding the price of individual product
        const productPrice = await prisma.product.findUnique({
            where: {product_id: productId},
            select: {price: true}
        });
        //creating cart item
        const addedItem = await prisma.cartItem.create({
            data: {
                user_id: id,
                product_id: productId,
                itemPrice: productPrice.price,
                totalPrice: productPrice.price
            }
        });
        res.json(addedItem);
    } catch(err) {
        res.status(500).json({error: err.message});
    } 
}

export const increaseQuant = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const productId = parseInt(req.params.id);
        //current item's id
        const currentItem = await prisma.cartItem.findFirst({
        where: { user_id: id, product_id: productId },
        });
        //increasing quantity
        const increasedItem = await prisma.cartItem.update({where: {item_id: currentItem.item_id}, 
            data: {
                quantity: {increment: 1}
            }
        });
        //increasing total price
        //finding the price of individual product
        const productPrice = await prisma.product.findUnique({
            where: {product_id: productId},
            select: {price: true}
        });
        const totalPrice = increasedItem.quantity * productPrice.price;
        const finalAddedItem = await prisma.cartItem.update({where: {item_id: currentItem.item_id},
        data: {totalPrice: totalPrice}});

        res.json(finalAddedItem);
    } catch(err) {
        res.status(500).json({ error: err.message});
    }
}

export const decreaseQuant = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const productId = parseInt(req.params.id);
        //current item's id
        const currentItem = await prisma.cartItem.findFirst({
        where: { user_id: id, product_id: productId },
        });
        //finding quant so user doesnt decrease into -ve values
        const quantity = await prisma.cartItem.findFirst({where: {item_id: currentItem.item_id}, select: {quantity: true}});
        if (quantity.quantity >= 1) {
            const decreasedItem = await prisma.cartItem.update({where: {item_id: currentItem.item_id}, 
            data: {
                quantity: {decrement: 1}
            }
            });
        } 
        //decreasing total price
        //first finding the price of individual product
        const productPrice = await prisma.product.findUnique({
            where: {product_id: productId},
            select: {price: true}
        });
        //then decreasing price
        const totalPrice = (quantity.quantity - 1) * productPrice.price;
        const finalAddedItem = await prisma.cartItem.update({where: {item_id: currentItem.item_id},
        data: {totalPrice: totalPrice}});

        res.json(finalAddedItem);
        //front end check if quantity is 1 and presses on decrease again, ask for confirmation then the confirmation button should redirect to deleteItem function
    } catch(err) {
        res.status(500).json({ error: err.message});
    }
}


export const deleteItem = async(req, res) => {
    try {
        const id = parseInt(req.user.userId);
        const productId = parseInt(req.params.id);
        const itemId = await prisma.cartItem.findFirst({where: {user_id: id, product_id: productId}, select: {item_id: true}});
        const deletedItem = await prisma.cartItem.delete({where: {item_id: itemId.item_id}});
        res.json(deletedItem);
    } catch(err) {
        res.status(500).json({ error: err.message});
    }
}