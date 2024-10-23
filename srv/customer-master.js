const cds = require('@sap/cds');

module.exports = async function () {
    const { CustomerMaster, ShiptoAddress, BilltoAddress } = this.entities;

    // Define the 'addCustomer' action
    this.on('addCustomer', async (req) => {
        const { ID, CustomerNumber, Soldto, Shipto, Billto, Payer, PARNR, PARAU, NAMEV, NAME1, TELF1, SORTL } = req.data;


        try {


            // Check if the record exists
            let query = SELECT.from(CustomerMaster, b => { b.CustomerNumber, b.NAME1 }).where({ CustomerNumber: CustomerNumber });
            let books = await cds.run(query)
            console.log(books.length)

            // if record not exists insert new record 
            if (books.length === 0) {

                // Validate required fields
                if (!CustomerNumber || !Soldto || !Payer) {
                    return { success: false, message: 'Missing required fields' };
                }

                const newCustomer = await cds.run(INSERT.into(CustomerMaster).entries({
                    ID: ID || cds.utils.uuid(),
                    CustomerNumber: CustomerNumber,
                    Soldto: Soldto,
                    Payer: Payer,
                    PARNR: PARNR,
                    PARAU: PARAU,
                    NAMEV: NAMEV,
                    NAME1: NAME1,
                    TELF1: TELF1,
                    SORTL: SORTL

                }));

                // Handle Shipto addresses
                if (Shipto && Shipto.length > 0) {
                    const shiptoEntries = Shipto.map(shipto => ({
                        customer_ID: ID,
                        ShiptoNr: shipto.ShiptoNr
                    }));
                    await cds.run(INSERT.into(ShiptoAddress).entries(shiptoEntries));
                }

                // Handle Billto addresses
                if (Billto && Billto.length > 0) {
                    const billtoEntries = Billto.map(billto => ({
                        customer_ID: ID, // Foreign key for composition
                        BilltoNr: billto.BilltoNr
                    }));
                    await cds.run(INSERT.into(BilltoAddress).entries(billtoEntries));
                }


                // Return success response with the created customer details
                return {
                    success: true,
                    message: 'Customer successfully added',
                    customer: {
                        ID: newCustomer.ID,
                        CustomerNumber,
                        Soldto,
                        Shipto: Shipto.map(shipto => ({ ShiptoNr: shipto.ShiptoNr })),
                        Billto: Billto.map(billto => ({ BilltoNr: billto.BilltoNr })),
                        Payer,
                        PARNR,
                        PARAU,
                        NAMEV,
                        NAME1,
                        TELF1,
                        SORTL
                    }
                };

                // else update the record with new data    
            } else {

                let updateData = {};
                if (Soldto) updateData.Soldto = Soldto;
                if (Payer) updateData.Payer = Payer;
                if (PARNR) updateData.PARNR = PARNR;
                if (PARAU) updateData.PARAU = PARAU;
                if (NAMEV) updateData.NAMEV = NAMEV;
                if (NAME1) updateData.NAME1 = NAME1;
                if (TELF1) updateData.TELF1 = TELF1;
                if (SORTL) updateData.SORTL = SORTL;

                // Perform the update only for fields that are non-null
                await cds.run(UPDATE(CustomerMaster).set(updateData).where({ CustomerNumber: CustomerNumber }));

                return {
                    success: true,
                    message: 'customer updated successfully',
                    customer: {
                        CustomerNumber,
                        Soldto,
                        Shipto: Shipto.map(shipto => ({ ShiptoNr: shipto.ShiptoNr })),
                        Billto: Billto.map(billto => ({ BilltoNr: billto.BilltoNr })),
                        Payer,
                        PARNR,
                        PARAU,
                        NAMEV,
                        NAME1,
                        TELF1,
                        SORTL
                    }
                };


            }

        } catch (error) {
            console.error('Error adding customer:', error);
            return { success: false, message: 'Error adding customer' };
        }
    });
};
