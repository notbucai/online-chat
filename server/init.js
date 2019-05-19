const inquirer = require('inquirer');
const colors = require('colors');
console.log("V 请先配置腾讯云cos V".bgBlue.magenta);
const aps = ["ap-beijing-1","ap-guangzhou","ap-beijing","ap-shanghai","ap-chengdu","ap-chongqing","ap-shenzhen-fsi","ap-shanghai-fsi"]
const fs = require('fs');
const path = require('path');
const configFileName = "website.config.json";
if(fs.readdirSync(__dirname).indexOf(configFileName) != -1){
    console.log("配置文件已存在 再次执行可能会将 原配置覆盖 请谨慎操作！！".grey.bgRed);
}

inquirer.prompt([{
    type: String,
    name: 'SecretId',
    message: 'SecretId: ',
    // default: "",
    validate(res){
        // console.log(res);
        if(res.startsWith("AKID")){
            return true;
        }
        return "SecretId 格式应该是：AKIDXXXXXXXXXXXXXXXXXXX";
    }
},
{
    type: String,
    name: 'SecretKey',
    message: 'SecretKey: ',
    validate(res){
        // console.log(res);
        if(res && res.length){
            return true;
        }
        return "SecretKey 不能为空";
    }
},
{
    type: String,
    name: 'Bucket',
    message: 'Bucket: ',
    validate(res){
        // console.log(res);
        if(res && res.length){
            return true;
        }
        return "Bucket 不能为空";
    }
},
{
    type: 'list',
    name: 'Region',
    message: 'Region: ',
    default:"ap-guangzhou",
    choices:aps,
    validate(res){
        return true;
    }
}
]).then((answers) => {
    const data = JSON.stringify(answers,2,2);
    console.log('\n 结果为: '.green,data.blue);
    console.log('\n 如果存在问题请修改配置文件'.yellow.bgWhite);
    
    fs.writeFileSync(path.join(__dirname , configFileName), data);

});