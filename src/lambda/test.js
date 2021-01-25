export async function handler(event, context) {
  try {
    console.log("queryStringParameters", event.queryStringParameters);
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: "Hello, World! DUDE!!!!" }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
}
