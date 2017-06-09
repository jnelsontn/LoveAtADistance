

def ListToDict(old_list):
    new_dict = {}
    for each_field in old_list:
        new_dict.update(each_field)
    return new_dict
