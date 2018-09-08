<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
            <span class="expand-key">创建订单时间: </span>
            <span class="expand-value">{{ row.creatTime }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">发货时间: </span>
            <span class="expand-value">{{ row.sendTime }}</span>
            </Col>
            <Col span="8">
            <span class="expand-key">成交时间: </span>
            <span class="expand-value">{{ row.successTime }}</span>
            </Col>
        </Row>
        <Row class="expand-row">
            <Col span="8">
            <span class="expand-key">店铺名称: </span>
            <span class="expand-value">{{ row.shopsName }}</span>
            </Col>            
            <Col span="8">
                <span class="expand-key">店铺序列号: </span>
                <span class="expand-value">{{ row.shopsId }}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">商品序列号: </span>
                <span class="expand-value">{{ row.goodsId }}</span>
            </Col>
        </Row>
        <Row>
            <Col span="8">
                <span class="expand-key">订单状态: </span>
                <span class="expand-value">{{ row.state }}</span>
            </Col>
        </Row>        
    </div>
</template>
<script>
export default {
  props: {
    row: Object
  }
};
</script>