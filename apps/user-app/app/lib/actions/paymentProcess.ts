import axios from "axios";

export async function paymentProcess(
  userId: string,
  token: string,
  amount: string
) {
  try {
    const response = await axios.post("http://localhost:3003/hdfcWebhook", {
      user_identifier: userId,
      token,
      amount,
    });

    console.log(response);
  } catch (err) {
    console.log("Error While Processing");
    console.log(err);
  }
}
