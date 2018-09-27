// 服务器域名
const baseUrl = 'https://www.superggb.cn/';

//内网测试域名
const testUrl = 'http://221h58z433.imwork.net/';

// 获取书籍信息接口地址(可选择全部或单个书籍)
const getBooksUrl = baseUrl + 'api/book/getBooks';
// 写评论接口
const commentUrl = baseUrl + 'api/comment/write';
// 查询当前用户是否已经购买该书籍并返回评论列表接口
const queryBookUrl = baseUrl + 'api/book/queryBook';
// 登录接口
const loginUrl = baseUrl + 'login';
// 获取当前用户已购书籍接口
const getBoughtBooksUrl = baseUrl + 'api/user/getBoughtBooks';
// 兑换书籍接口
const buyBookUrl = baseUrl + 'api/order/buy';


module.exports = {
  baseUrl:baseUrl,
  testUrl:testUrl
};
