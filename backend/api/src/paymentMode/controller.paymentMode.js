const paymentModeService = require("./service.paymentMode");

const paymentModeController = {};

paymentModeController.addPaymentDetails = async (req, res) => {
  try {
    const { paymentMode, upiId, bankName } = req.body;

    const amountData = await paymentModeService.addPaymentDetails({
      paymentMode,
      upiId,
      bankName,
    });
    res.send({
      status: "OK",
      msg: "Paymentmode details added successfully",
      data: amountData,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "OK",
      msg: "Something went wrong",
      data: null,
    });
  }
};
paymentModeController.getPaymentMode = async (req, res) => {
  try {
    // const { id } = req.params;
    const payementModeData = await paymentModeService.getPaymentMode();

    return res.send({
      status: "OK",
      msg: "Payment details retrieved successfully",
      data: payementModeData,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

paymentModeController.updatePaymentMode = async (req, res) => {
  try {
    const { id } = req.params;
    const { paymentMode, upiId, bankName } = req.body;

    const updatePaymentModeData = await paymentModeService.updatePaymentMode(
      id,
      {
        paymentMode,
        upiId,
        bankName,
      }
    );

    if (!updatePaymentModeData) {
      return res.send({
        status: "Error",
        msg: "Payment details not found",
        data: null,
      });
    }

    return res.send({
      status: "OK",
      msg: " Payment details updated successfully",
      data: updatePaymentModeData,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};

paymentModeController.deletePaymentMode = async (req, res) => {
  try {
    const { id } = req.params;

    const deletePaymentModeData = await paymentModeService.deletePaymentMode(
      id
    );

    if (!deletePaymentModeData) {
      return res.send({
        status: "Error",
        msg: "payment details not found",
        data: null,
      });
    }

    return res.send({
      status: "OK",
      msg: "Payment details deleted successfully",
      data: deletePaymentModeData,
    });
  } catch (error) {
    return res.send({
      status: "Error",
      msg: "Something went wrong",
      data: null,
    });
  }
};
module.exports = paymentModeController;
