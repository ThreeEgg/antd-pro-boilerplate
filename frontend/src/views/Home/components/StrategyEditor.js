import React, {Component} from 'react';
import {Tag} from 'antd';
import styles from './StrategyEditor.less';

class StrategyEditor extends Component {

    instance = null;

    componentDidMount() {
        this.initJsPlumbInstance();
    }

    initJsPlumbInstance = () => {
        this.instance = window.jsPlumb.newInstance({
            connector: ['Flowchart', {midpoint: 0.1,cornerRadius: 4}],
            paintStyle: { strokeWidth: 2, stroke: "#ffa500" },
            endpoint: [ "Dot", { radius: 8 } ],
            endpointStyle: { fill: "#ffa500" },
            container: "editor"
        });

        const instance = this.instance;

        var list1El = window.document.querySelector("#list-one"),
            list2El = window.document.querySelector("#list-two"),
            list3El = window.document.querySelector("#list-three"),
            list4El = window.document.querySelector("#list-four");

        // 设置Source
        var items = list1El.querySelectorAll(".source");
        for (var i = 0; i < items.length; i++) {
            instance.makeSource(items[i], {
                allowLoopback: false,
                anchor: ["Left", "Right" ]
            });
        }
        // 设置Target
        instance.makeTarget(list2El, {
            allowLoopback: false,
            anchor: ["Top"]
        });
        instance.makeTarget(list3El, {
            allowLoopback: false,
            anchor: ["Top"]
        });
        instance.makeTarget(list4El, {
            allowLoopback: false,
            anchor: ["Top"]
        });

        // 附加list类名，用于list中的节点联动
        Array.from(window.document.querySelectorAll('.source-set')).forEach(el => {
            instance.addList(el);
        });
    }

    render() {
        return (
            <div className={styles.container} style={{height: 400, backgroundColor: 'rgba(255,255,255,.1)'}} id={'editor'}>
                <div className={styles.item} id={'list-one'}>
                    子拨打策略 1：一轮结果
                    <div>
                        判断类型
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                    </div>
                    <div className="source-set">
                        <div>
                            <div className="source">判断类型集 1：需人工</div>
                            <div><Tag>接线人沟通</Tag></div>
                        </div>
                        <div>
                            <div className="source">判断类型集 2：需人工</div>
                            <div><Tag>接线人沟通</Tag></div>
                        </div>
                        <div>
                            <div className="source">判断类型集 1：需人工</div>
                            <div><Tag>接线人沟通</Tag></div>
                        </div>
                        <div>
                            <div className="source">判断类型集 2：需人工</div>
                            <div><Tag>接线人沟通</Tag></div>
                        </div>
                        <div>
                            <div className="source">判断类型集 1：需人工</div>
                            <div><Tag>接线人沟通</Tag></div>
                        </div>
                        <div>
                            <div className="source">判断类型集 2：需人工</div>
                            <div><Tag>接线人沟通</Tag></div>
                        </div>
                        <div>
                            <div className="source">判断类型集 1：需人工</div>
                            <div><Tag>接线人沟通</Tag></div>
                        </div>
                        <div>
                            <div className="source">判断类型集 2：需人工</div>
                            <div><Tag>接线人沟通</Tag></div>
                        </div>
                    </div>
                </div>

                <div className={styles.item} id={'list-two'}>
                    子拨打策略 2：暂未命名
                    <div>
                        判断类型
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                    </div>
                    <div>
                        <div className="source">判断类型集 1：需人工</div>
                        <div><Tag>接线人沟通</Tag></div>
                    </div>
                    <div>
                        <div className="source">判断类型集 2：需人工</div>
                        <div><Tag>接线人沟通</Tag></div>
                    </div>
                </div>

                <div className={styles.item} id={'list-three'}>
                    子拨打策略 3：暂未命名
                    <div>
                        判断类型
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                    </div>
                    <div>
                        <div className="source">判断类型集 1：需人工</div>
                        <div><Tag>接线人沟通</Tag></div>
                    </div>
                    <div>
                        <div className="source">判断类型集 2：需人工</div>
                        <div><Tag>接线人沟通</Tag></div>
                    </div>
                </div>

                <div className={styles.item} id={'list-four'}>
                    子拨打策略 4：暂未命名
                    <div>
                        判断类型
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                        <Tag>身体异常</Tag>
                    </div>
                    <div>
                        <div className="source">判断类型集 1：需人工</div>
                        <div><Tag>接线人沟通</Tag></div>
                    </div>
                    <div>
                        <div className="source">判断类型集 2：需人工</div>
                        <div><Tag>接线人沟通</Tag></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StrategyEditor;
