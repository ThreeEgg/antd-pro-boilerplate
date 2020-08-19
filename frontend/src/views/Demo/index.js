import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const grid = 8;
class Demo extends Component {

  state = {
    items: []
  }

  componentDidMount() {
    this.setState({
      items: this.getItems(11)
    })
  }

  getItems = count =>
    Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + 1}`,
      content: `this is content ${k + 1}`
    }));

  reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);

    const [removed] = result.splice(startIndex, 1);
    console.log('removed', removed)

    result.splice(endIndex, 0, removed);
    return result;
  };

  getItemStyle = (isDragging, draggableStyle) => {
    // console.log('getItemStyle', isDragging, draggableStyle)
    return ({
      // some basic styles to make the items look a bit nicer
      userSelect: "none",
      padding: grid * 2,
      margin: `0 0 ${grid}px 0`,

      // 拖拽的时候背景变化
      background: isDragging ? "lightgreen" : "#ffffff",

      // styles we need to apply on draggables
      ...draggableStyle
    })
  };

  /* getListStyle = () => ({
    background: 'black',
    padding: grid,
    width: 250
  }); */

  getListStyle = () => ({
    background: 'black',
    display: 'flex',
    padding: grid,
    overflow: 'auto',
  });

  onDragEnd = (result) => {
    console.log('onDragEnd', result);
    if (!result.destination) {
      return;
    }

    const items = this.reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        {/* <center> */}
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              // provided.droppableProps应用的相同元素.
              {...provided.droppableProps}
              // 为了使 droppable 能够正常工作必须 绑定到最高可能的DOM节点中provided.innerRef.
              ref={provided.innerRef}
              style={this.getListStyle(snapshot)}
            >
              {this.state.items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={this.getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {/* </center> */}
      </DragDropContext>
    )
  }
}

export default Demo
