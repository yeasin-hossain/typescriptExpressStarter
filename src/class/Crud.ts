import ResponseMessage from "./Response";

const response = new ResponseMessage();

export default class Crud {
  // এই ক্লাস ব্যবহার করার সময় মডেল পাস করতে হবে এবং সেই মডেলেই নিচের সকল অপারেশন করা হবে।
  private modelName: any;
  constructor(name: any) {
    this.modelName = name;
  }

  // সার্ভারে ডাটা সেভ করার জন্য এই মেথড ব্যবহার করব
  async _saveData(data: any) {
    try {
      if (data) {
        const savedData = await this.modelName.create(data);
        return response.successResponse(savedData);
      } else {
        return response.badRequestResponse("Fill Requeued felid");
      }
    } catch (error) {
      console.log({ crudSave: error });
      return response.serverErrorResponse();
    }
  }

  //  সব ডাটা সার্ভার থেকে পাওয়ার জন্য এটা ব্যবহার করা হবে।
  async _getAll(filter: string = "") {
    try {
      const allResponse = await this.modelName
        .find({}, filter)
        .sort({ updatedAt: -1 });
      if (allResponse) {
        return response.successResponse(allResponse);
      } else {
        return response.serverErrorResponse();
      }
    } catch (error) {
      console.log({ crudGetAll: error });
      return response.serverErrorResponse();
    }
  }
  //  সব ডাটা সার্ভার থেকে পাওয়ার জন্য এটা ব্যবহার করা হবে।
  async _getByQuery(query: object, filter: string = "") {
    try {
      const allResponse = await this.modelName
        .find(query, filter)
        .sort({ updatedAt: -1 });
      if (allResponse) {
        return response.successResponse(allResponse);
      } else {
        return response.serverErrorResponse();
      }
    } catch (error) {
      console.log({ crudGetAll: error });
      return response.serverErrorResponse();
    }
  }
  //  সব ডাটা সার্ভার থেকে পাওয়ার জন্য এটা ব্যবহার করা হবে।
  async _getSingle(id: string) {
    try {
      const singleItem = await this.modelName.findById(id);
      if (singleItem) {
        return response.successResponse(singleItem);
      } else {
        return response.serverErrorResponse();
      }
    } catch (error) {
      console.log({ crudGetAll: error });
      return response.serverErrorResponse();
    }
  }

  //  ডাটা আপডেট করার জন্য এটা ব্যবহার করা হবে।
  async _updateData(id: string, data: object) {
    try {
      const findData = await this.modelName.findById(id);
      if (findData) {
        const updateData = await this.modelName.findByIdAndUpdate(id, data);

        if (updateData) {
          const updatedData = await this.modelName.findById({ _id: id });
          return response.successResponse(updatedData);
        }
      } else {
        return response.notFoundResponse("Data Not Found");
      }
    } catch (error) {
      console.log({ crudUpdate: error });
      // কেন যেন কাজ করতেছে না তাই এখানে নট ফাউন্ড রেসপন্স টা দিয়েছি
      return response.notFoundResponse("Data Not Found");
    }
  }

  // একটা ডাটা ডিলিট করার জন্য
  async _deleteData(id: string) {
    try {
      const deleteData = await this.modelName.findByIdAndRemove(id);
      if (deleteData) {
        return response.successResponse(deleteData);
      } else {
        return response.serverErrorResponse();
      }
    } catch (error) {
      console.log({ delete: error });
      return response.notFoundResponse("Data Not Found");
    }
  }
}
