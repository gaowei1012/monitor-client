/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useEffect, useState } from "react";
import type { TableColumnType } from "antd";
import {
  Table,
  Button,
  Form,
  Select,
  Row,
  Col,
  Card,
  Space,
  DatePicker,
  Tag,
  message
} from "antd";
import { getCorpList, getChannelOrder } from "../../../apis/index";
import { removeEmptyValues } from "../../../utils/removeEmptyObj";
import { getChannelId } from "../../../utils/getChannelId";
import Utils from "../../../utils/index";
import { getTableScroll } from "../../../utils/getTableScroll";

type DatabaseDetailCloumns = {};

type CorpState = {
  corpId: string;
  schoolName: string;
};

const tagOpt: any = { "1": "支付", "2": "退款", "3": "全额退款" };
const tagColor: any = { "1": "#108ee9", "2": "#87d068", "3": "#f50" }

const { Option } = Select;

const config = {
  rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
};

export const IncomeDetails = () => {
  const [corplist, setCorplist] = useState<CorpState[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [openDate, setOpenDate] = useState<boolean>(false)
  const [total, setTotal] = useState<number>(0);
  const [messageApi, contextHolder] = message.useMessage();
  const [scrollY, setScrollY] = useState<any>(0)

  useEffect(() => {
    setScrollY(getTableScroll())
  }, [])

  useEffect(() => {
    queryCorpList();
    const data = {
      channelId: getChannelId(),
      // date: dayjs().format('YYYYMM'),
      date: "",
      corpId: "",
      pageNum: 1,
      pageSize: 10,
      orderType: "",
    };
    queryChannelOrder(removeEmptyValues(data));
  }, []);

  const queryCorpList = async () => {
    const storagelist = Utils.getStorage("corplist");
    if (storagelist) {
      const temp = JSON.parse(storagelist);
      setCorplist(temp);
    } else {
      const result = (await getCorpList("1")) as {
        code: string;
        data: CorpState[];
      };
      if (result.code == "10000") {
        if (result.data && result.data.length != 0) {
          Utils.setStorage("corplist", JSON.stringify(result.data));
          setCorplist(result.data);
        } else {
          setCorplist([]);
        }
      }
    }
  };

  const queryChannelOrder = async (data: any) => {
    setLoading(true);
    const result = (await getChannelOrder(data)) as { code: string; data: any, message: string };
    if (result.code == "10000") {
      if (result.data) {
        setTotal(result.data.total);
      }
      if (
        result.data &&
        result.data.records &&
        result.data.records.length != 0
      ) {
        setLoading(false);
        setDataSource(result.data.records);
      } else {
        setLoading(false);
        setDataSource([]);
      }
    } else {
      messageApi.open({
        type: 'error',
        content: `${result.message}`
      })
      setDataSource([]);
      setLoading(false);
    }
  };

  const columns: TableColumnType<DatabaseDetailCloumns>[] = [
    {
      title: "时间",
      dataIndex: "dateTime",
      width: 200,
    },
    {
      title: "学校",
      dataIndex: "schoolName",
    },
    {
      title: "商品名称",
      dataIndex: "productName",
    },
    {
      title: "订单号",
      dataIndex: "orderCode",
      width: 200,
    },
    {
      title: "分成金额(元)",
      dataIndex: "incomeAmount",
      width: 200,
      render(value, record, index) {
        return <span>{value ? `${value / 100}` : 0}</span>;
      },
    },
    {
      title: "订单类型",
      dataIndex: "orderType",
      width: 180,
      render(value, record, index) {
        if (value) {
          return <Tag color={tagColor[value]}>{value != null ? tagOpt[value] : "-"}</Tag>;
        } else {
          return <></>
        }
      },
    },
    {
      title: "备注",
      dataIndex: "note",
      render(value, record, index) {
        return <span>{value ? value : "-"}</span>;
      },
    },
  ];
  const [form] = Form.useForm();

  const onFinish = () => {};

  // 重置
  const onReset = () => {
    form.resetFields();
    const data = {
      channelId: getChannelId(),
      date: "",
      corpId: null,
      pageNum: 1,
      pageSize: 20,
      orderType: null,
    };
    queryChannelOrder(removeEmptyValues(data));
  };

  const onFiltrate = () => {
    const formResult = form.getFieldsValue();
    const data = {
      channelId: getChannelId(),
      date: formResult.startDate ? formResult.startDate.format("YYYYMM") : "",
      corpId: formResult.corpId ? formResult.corpId : "",
      pageNum: 1,
      pageSize: 20,
      orderType: formResult.orderType ? formResult.orderType : "",
    };
    queryChannelOrder(removeEmptyValues(data));
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {contextHolder}
      <Card  variant="borderless">
        <Row gutter={24} justify="space-between">
          <Col span={16}>
            <Form onFinish={onFinish} form={form}>
              <Row justify="start" gutter={24}>
                <Col span={8}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    name="corpId"
                    label="学校"
                  >
                    <Select placeholder="学校筛选" allowClear>
                      {corplist.map((item) => {
                        return (
                          <Option key={item.corpId}>{item.schoolName}</Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="startDate"
                    label="日期"
                    style={{ marginBottom: 0 }}
                    {...config}
                  >
                    <DatePicker
                      placeholder="日期筛选"
                      open={openDate}
                      picker='month'
                      onFocus={() => {
                        setOpenDate(true)
                      }}
                      onChange={() => {
                        setOpenDate(false)
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    name="orderType"
                    label="订单分类"
                    style={{ marginBottom: 0 }}
                  >
                    <Select placeholder="选择订单分类">
                      <Option key="1">支付</Option>
                      <Option key="2">退款</Option>
                      <Option key="3">部分退款</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
          <Col>
            <Button
              type="default"
              style={{ marginRight: 12 }}
              onClick={onReset}
            >
              重置
            </Button>
            <Button type="primary" onClick={onFiltrate}>
              筛选
            </Button>
          </Col>
        </Row>
      </Card>
      <Card variant="borderless">
        <Table
          scroll={{ y: scrollY }}
          columns={columns}
          bordered
          loading={loading}
          dataSource={dataSource}
          pagination={{
            position: ["bottomRight"],
            pageSize: 20,
            total,
            onChange(page, pageSize) {
              const formResult = form.getFieldsValue();
              const data = {
                channelId: getChannelId(),
                date: formResult.startDate
                  ? formResult.startDate.format("YYYYMM")
                  : "",
                corpId: formResult.corpId ? formResult.corpId : "",
                pageNum: page,
                pageSize: pageSize,
                orderType: formResult.orderType ? formResult.orderType : "",
              };
              queryChannelOrder(removeEmptyValues(data));
              console.log("分页", page, pageSize);
            },
          }}
        />
      </Card>
    </Space>
  );
};
