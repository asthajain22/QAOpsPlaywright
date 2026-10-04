const {test, expect} = require('@playwright/test');
const ExcelJs = require('exceljs');

const workbook = new ExcelJs.Workbook();

async function readExcel(worksheet,searchText)
{
    let output = {row:-1,column:-1};
    worksheet.eachRow((row,rowNumber)=>
    {
        row.eachCell((cell,colNumber) =>
        {
            if(cell.value === searchText)
            {
                output.row = rowNumber;
                output.column = colNumber;
            }
        }
        );
    }
    );
    return output;
}

//writeExcelTest("Mango","Rabbit","C:\\Users\\Astha Jain\\Downloads\\excelTest.xlsx");

//update Mango price to 350
async function updateProductPrice(searchText,replacePrice,change,filePath)
{
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);
    const cell = worksheet.getCell(output.row,output.column+change.colChange);
    cell.value = replacePrice;
    await workbook.xlsx.writeFile(filePath);
}

//updateProductPrice("Mango",350,{rowChange:0,colChange:2},"C:\\Users\\Astha Jain\\Downloads\\excelTest.xlsx");

test('Upload, download Excel Validation', async({page})=>
{
    const textSearch = 'Mango';
    const updateValue = '350';
    await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', {name: 'Download'}).click();
    await downloadPromise;
    await updateProductPrice(textSearch,updateValue,{rowChange:0,colChange:2},"C:\\Users\\Astha Jain\\Downloads\\excelTest.xlsx");
    await page.locator("#fileinput").click();
    await page.locator("#fileinput").setInputFiles("C:\\Users\\Astha Jain\\Downloads\\excelTest.xlsx");  //setInputFiles only work when locator's type=file
    const textLocator = page.getByText(textSearch);
    const desiredRow = page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);
}
);