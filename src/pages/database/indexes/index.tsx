/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import type { TableColumnType } from "antd";
import { Table, Space, Select, Form, Card, Row, Col, Button, message } from "antd";
import { getCorpList, getChannelDataBoardCount } from "../../../apis/index";
import { getChannelId } from "../../../utils/getChannelId";
import { removeEmptyValues } from "../../../utils/removeEmptyObj";
import { getTableScroll } from "../../../utils/getTableScroll";
import Utils from "../../../utils/index";

type DatabaseDetailCloumns = {};

type CorpState = {
  corpId: string;
  schoolName: string;
};

const { Option } = Select;

export const Database = () => {
  const [corplist, setCorplist] = useState<CorpState[]>([]);
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
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
      pageNum: 1,
      pageSize: 20,
    };
    queryChannelDataBoardCount(data);
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
          setCorplist(result.data);
        } else {
          setCorplist([]);
        }
      }
    }
  };

  const queryChannelDataBoardCount = async (data: any) => {
    setLoading(true);
    const result = (await getChannelDataBoardCount(data)) as {
      code: string;
      data: any;
      message: string
    };
    if (result.code === "10000") {
      setLoading(false);
      if (result.data) {
        setTotal(result.data.total);
      }
      if (
        result.data &&
        result.data.records &&
        result.data.records.length != 0
      ) {
        setDataSource(result.data.records);
      } else {
        setDataSource([]);
      }
      console.log("queryChannelDataBoardCount", result.data);
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
      dataIndex: "date",
    },
    {
      title: "有效打卡任务",
      dataIndex: "cardTaskNum",
    },
    {
      title: "应打卡人数",
      dataIndex: "totalCardPersonNum",
      render(value, record, index) {
        return <span>{value?value:0}人</span>
      },
    },
    {
      title: "实际打卡人数",
      dataIndex: "cardPersonNum",
      render(value, record, index) {
        return <span>{value?value:0}人</span>
      },
    },
    {
      title: "打卡率",
      dataIndex: "cardRate",
      render(value, record, index) {
        return <span>{value?value:0}%</span>
      },
    },
    {
      title: "分成金额(元)",
      dataIndex: "payAmount",
      render(value, record, index) {
        return <span>{value ?`${(value/100)}元`:0}</span>
      },
    },
  ];
  const [form] = Form.useForm();

  const onReset = () => {
    form.resetFields();
    const data = {
      channelId: getChannelId(),
      pageNum: 1,
      pageSize: 20,
    };
    queryChannelDataBoardCount(data);
  };

  const onFiltrate = () => {
    const formResult = form.getFieldsValue();
    const data = {
      channelId: getChannelId(),
      corpId: formResult.corpId ? formResult.corpId : "",
      pageNum: 1,
      pageSize: 20,
    };
    queryChannelDataBoardCount(removeEmptyValues(data));
  };

  return (
    <Space direction="vertical" size="middle" style={{ display: "flex" }}>
      {contextHolder}
      <Card  variant="borderless">
        <Row justify="space-between">
          <Col span={6}>
            <Form form={form}>
              <Form.Item style={{ marginBottom: 0 }} name="corpId" label="学校">
                <Select placeholder="学校筛选" allowClear onChange={() => {}}>
                  {corplist.map((item) => {
                    return <Option key={item.corpId}>{item.schoolName}</Option>;
                  })}
                </Select>
              </Form.Item>
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
      <Card>
        <Table
          // scroll={{ y: 55 * 5 }}
          scroll={{ y: scrollY }}
          columns={columns}
          bordered
          dataSource={dataSource}
          loading={loading}
          pagination={{
            position: ["bottomRight"],
            pageSize: 20,
            total,
            onChange(page, pageSize) {
              const formResult = form.getFieldsValue();
              const data = {
                channelId: getChannelId(),
                corpId: formResult.corpId ? formResult.corpId : "",
                pageNum: page,
                pageSize: pageSize,
              };
              queryChannelDataBoardCount(removeEmptyValues(data));
            },
          }}
        />
      </Card>
    </Space>
  );
};
