const {
    DynamoDBDocumentClient,
    GetCommand,
    ScanCommand,
} = require("@aws-sdk/lib-dynamodb")

const client = require("../dynamoClient")
const docClient = DynamoDBDocumentClient.from(client)

async function getUserById(userId) {
    const command = new GetCommand({
        TableName: "Employees-2023BCD0059",
        Key: { "emp_id": userId },
    })
    const data = await docClient.send(command)
    console.log("GetCommand result:", data.Item)
    return data.Item
}

async function scanAllPaginated() {
    let items = []
    let ExclusiveStartKey
    do {
        const command = new ScanCommand({
            TableName: "Employees-2023BCD0059",
            ExclusiveStartKey,
        })
        const data = await docClient.send(command)
        if (data.Items) items = items.concat(data.Items)
        ExclusiveStartKey = data.LastEvaluatedKey
    } while (ExclusiveStartKey)
    console.log("Scan all items (paginated):", items)
    return items
}

async function scanWithFilter(filterOptions) {
    const expressions = []
    const exprNames = {}
    const exprValues = {}

    if (filterOptions.role) {
        expressions.push("#role = :role")
        exprNames["#role"] = "role"
        exprValues[":role"] = filterOptions.role
    }
    if (typeof filterOptions.minAge === "number") {
        expressions.push("#age >= :minAge")
        exprNames["#age"] = "age"
        exprValues[":minAge"] = filterOptions.minAge
    }

    const params = {
        TableName: "Employees-2023BCD0059",
    }
    if (expressions.length) {
        params.FilterExpression = expressions.join(" AND ")
        params.ExpressionAttributeNames = exprNames
        params.ExpressionAttributeValues = exprValues
    }

    const command = new ScanCommand(params)
    const data = await docClient.send(command)
    console.log(
        `Scan with filter (${JSON.stringify(filterOptions)}):`,
        data.Items || []
    )
    return data.Items || []
}

async function main() {
    try {
        await getUserById("u001")

        await scanAllPaginated()

        await scanWithFilter({ role: "AI Engineer" })
        await scanWithFilter({ minAge: 25 })
        await scanWithFilter({ role: "Data Scientist", minAge: 25 })
    } catch (err) {
        console.error("Error:", err)
    }
}

main()
