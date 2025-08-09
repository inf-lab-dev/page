import uuid


# Class that represents a request that has been made through the contact form
class ContactRequest:

    def __init__(self, name, email, subject, text):
        self.name = name
        self.email = email
        self.subject = subject
        self.text = text

        # generates a semi-unique string
        self._id = str(uuid.uuid4())

    @property
    def id(self):
        return self._id

# TODO: Write the remaining code
